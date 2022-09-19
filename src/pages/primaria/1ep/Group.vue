<template>
  <q-page padding>
    <transition-group
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <q-table
        key="page-grades"
        :grid="$q.platform.is.mobile ? true : false"
        :title="`Calificaciones del Trimestre ${trimester} de ${
          courseName ? courseName : ''
        }`"
        :rows="rows"
        :columns="columns"
        :row-key="(row) => row.userid"
        selection="single"
        v-model:selected="selected"
        :loading="loading"
        :pagination="{ rowsPerPage: 0 }"
        :hide-pagination="true"
        :wrap-cells="true"
        color="primary"
        class="q-ma-md"
      >
        <template v-slot:top-right>
          <!--<q-btn
            round
            elevated
            color="primary"
            icon="west"
            class="q-ma-lg"
            :to="{ name: '1ep', params: { trimester } }"
          >
            <q-tooltip> Regresar </q-tooltip>
          </q-btn>

          <q-btn
            class="q-ma-lg"
            round
            elevated
            color="negative"
            icon="edit"
            v-if="selected.length > 0"
            @click="setTempFeedback"
          >
            <q-tooltip> Editar el comentario </q-tooltip>
          </q-btn>

          <q-btn
            class="q-ma-lg"
            round
            elevated
            disable
            color="negative"
            icon="edit"
            v-else
          />

          <q-btn
            round
            elevated
            color="primary"
            icon="visibility"
            class="q-ma-lg"
            v-if="!$q.platform.is.mobile"
          >
            <q-tooltip> Vista previa </q-tooltip>
          </q-btn>
          <q-btn
            round
            elevated
            color="primary"
            icon="file_download"
            class="q-ma-lg"
          >
            <q-tooltip> Descargar </q-tooltip>
          </q-btn>-->

          <q-btn-group rounded class="q-ma-lg">
            <q-btn
              color="primary"
              icon="west"
              :to="{ name: '1ep', params: { trimester } }"
            >
              <q-tooltip> Regresar </q-tooltip>
            </q-btn>

            <q-btn
              color="negative"
              icon="edit"
              v-if="selected.length > 0"
              @click="setTempFeedback"
            >
              <q-tooltip> Editar el comentario </q-tooltip>
            </q-btn>
            <q-btn disable color="negative" icon="edit" v-else />

            <q-btn
              color="deep-orange-6"
              icon="edit_note"
              v-if="selected.length > 0"
            >
              <q-tooltip> Editar el comentario al CIDEAD </q-tooltip>
            </q-btn>
            <q-btn disable color="deep-orange-6" icon="edit_note" v-else />

            <q-btn
              color="primary"
              icon="visibility"
              v-if="!$q.platform.is.mobile"
            >
              <q-tooltip> Vista previa </q-tooltip>
            </q-btn>

            <q-btn 
              color="primary" 
              icon="file_download"
            >
              <q-tooltip> Descargar </q-tooltip>
            </q-btn>
          </q-btn-group>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" :key="`ceeh_${props.row.index}`">
            <q-td>
              <q-toggle color="negative" v-model="props.selected">
                <q-tooltip v-if="selected.length == 0">
                  Active para editar
                </q-tooltip>
              </q-toggle>
            </q-td>

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </transition-group>

    <q-dialog
      v-model="prompt"
      persistent
      square
      position="top"
      @show="getStudentName"
      @hide="studentName = ''"
    >
      <q-card style="min-width: 60%">
        <q-card-section>
          <div class="text-h6">Comentario de {{ studentName }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            autofocus
            v-if="selected.length > 0"
            v-model="selectedFeedback"
            type="textarea"
            :rules="[required]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            round
            icon="block"
            color="negative"
            class="q-mr-lg q-mb-md"
            v-close-popup
            @click="selected = []"
          >
            <q-tooltip> Cancelar </q-tooltip>
          </q-btn>
          <q-btn
            round
            icon="save"
            color="primary"
            class="q-mr-lg q-mb-md"
            v-close-popup
            @click="editSelectedFeedback"
          >
            <q-tooltip> Guardar </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { SessionStorage, createMetaMixin } from "quasar";
export default {
  name: "OneEPGroup",
  props: {
    trimester: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
  },

  data() {
    const columns = [
      {
        name: "Name",
        align: "left",
        label: "Estudiante",
        field: (row) => row.firstname + " " + row.lastname,
        format: (val) => val,
      },
      {
        name: "NotaTrimestre",
        align: "center",
        label: "Calificación",
        field: (row) => row.NotaTrimestre,
        format: (val) => (val ? Math.round(val * 10) / 10 : "SIN CALIFICACIÓN"),
        classes: (row) => (row.NotaTrimestre ? "text-center" : "text-negative"),
      },
      {
        name: "TrimestreObservaciones",
        align: "center",
        label: "Comentario",
        // field: (row) => row.TrimestreObservaciones,
        field: (row) => row.TrimestreObservaciones,
        format: (val) => this.removeTags(val),
        classes: (row) =>
          row.TrimestreObservaciones ? "text-justify" : "text-negative",
        style: "width: 35%",
      },
      {
        name: "Cidead",
        align: "center",
        label: "CIDEAD",
        field: (row) => row.feedback_cidead,
        format: (val) => (val ? val + " <strong> OK </strong>" : val),
        style: "width: 35%",
      },
    ];

    return {
      columns,
      rows: [],
      selected: [],
      selectedFeedback: "",
      courseName: null,
      loading: false,
      prompt: false,
      studentName: "",
      cidead: [],
      dataRows: [],
    };
  },
  mixins: [
    createMetaMixin(() => {
      return {
        title: "BM - Calificaciones por asignatura",
      };
    }),
  ],
  methods: {
    ...mapActions("primaria", ["editFeedback"]),

    async getGroupGrades() {
      this.loading = true;
      let token = SessionStorage.getItem("token");
      await this.$api
        .get(
          `/prim/1ep/group?trimester=${this.trimester}&course=${this.course}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          this.courseName = res.data.data.course[0].course_name;
          for (const rowGrades of res.data.data.grades) {
            this.dataRows.push(rowGrades);
          }
          for (const rowCidead of res.data.data.feedback_cidead) {
            this.cidead.push(rowCidead);
          }
          this.rows = this.dataRows.map((item, i) =>
            Object.assign({}, item, this.cidead[i])
          );
          console.log(this.rows);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$store.dispatch("auth/cleanApp");
          }
        });
      this.loading = false;
    },
    // No props received?
    noProps() {
      if (!this.trimester || !this.course) {
        this.$router.go(-1);
      }
    },
    // Remove any HTML tags in comments
    removeTags(str) {
      if (str === null || str === "") {
        return "NO SE HA DEFINIDO EL COMENTARIO";
      } else {
        str = str.toString();
        return str.replace(/(<([^>]+)>)/gi, " ");
      }
    },
    // Form rules
    required(val) {
      return (val && val.length > 0) || "Este campo no puede estar vacío";
    },
    // Edit selected feedback
    async editSelectedFeedback() {
      await this.selected.filter((item) => {
        this.editFeedback({
          feedbackid: item.feedbackid,
          feedback: this.selectedFeedback,
        });
      });
      this.selected = [];
      this.rows = [];
      this.getGroupGrades();
    },
    // Get selected student name
    getStudentName() {
      if (this.prompt) {
        this.selected.filter((item) => {
          this.studentName = item.firstname + " " + item.lastname;
        });
      }
    },

    setTempFeedback() {
      this.prompt = true;
      this.selectedFeedback = this.removeTags(
        this.selected[0].TrimestreObservaciones
      );
    },
  },
  mounted() {
    this.noProps();
  },
  created() {
    this.getGroupGrades();
  },
};
</script>
