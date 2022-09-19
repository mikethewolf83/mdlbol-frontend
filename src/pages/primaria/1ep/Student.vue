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
          studentName ? studentName : ''
        }`"
        :rows="rows"
        :columns="columns"
        :row-key="(row) => row.CursoId"
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
          <q-btn
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
            color="blue-grey"
            icon="visibility"
            class="q-ma-lg"
            v-if="!$q.platform.is.mobile"
          >
            <q-tooltip> Vista previa </q-tooltip>
          </q-btn>

          <q-btn
            round
            elevated
            color="blue-grey"
            icon="file_download"
            class="q-ma-lg"
          >
            <q-tooltip> Descargar </q-tooltip>
          </q-btn>
        </template>

        <template v-slot:body-selection="scope">
          <q-toggle color="negative" v-model="scope.selected">
            <q-tooltip v-if="selected.length == 0">
              Active para editar
            </q-tooltip>
          </q-toggle>
        </template>
      </q-table>
    </transition-group>

    <q-dialog v-model="prompt" persistent square position="top" @show="getCourseName" @hide="courseName = ''">
      <q-card style="min-width: 60%">
        <q-card-section>
          <div class="text-h6">Comentario de {{ courseName }}</div>
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
  name: "OneEPStudents",
  props: {
    trimester: {
      type: String,
      required: false,
    },
    student: {
      type: String,
      required: false,
    },
  },

  data() {
    const columns = [
      {
        name: "Curso",
        align: "left",
        label: "Asignatura",
        field: (row) => row.Curso,
        format: (val) => val,
      },
      {
        name: "NotaTrimestre",
        align: "center",
        label: "Calificación",
        field: (row) => row.NotaTrimestre,
        format: (val) => (val ? Math.round(val * 10) / 10 : "SIN CALIFICACIÓN"),
        classes: (row) => row.NotaTrimestre ? "text-center" : "text-negative",
      },
      {
        name: "TrimestreObservaciones",
        align: "center",
        label: "Comentario",
        field: (row) => row.TrimestreObservaciones,
        format: (val) => this.removeTags(val),
        classes: (row) => row.TrimestreObservaciones ? "text-justify" : "text-negative",
        style: "width: 65%",
      },
    ];

    return {
      columns,
      rows: [],
      selected: [],
      selectedFeedback: "",
      studentName: null,
      loading: false,
      prompt: false,
      courseName: "",
      feedback: {
        feedbackid: null,
        feedback: "",
      },
    };
  },
  mixins: [
    createMetaMixin(() => {
      return {
        title: "BM - Calificaciones por estudiante",
      };
    }),
  ],
  methods: {
    ...mapActions("primaria", ["editFeedback"]),

    async getStudentGrades() {
      this.loading = true;
      let token = SessionStorage.getItem("token");
      await this.$api
        .get(
          `/prim/1ep/students?trimester=${this.trimester}&student=${this.student}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          this.studentName =
            res.data.data.student[0].firstname +
            " " +
            res.data.data.student[0].lastname;
          for (const row of res.data.data.grades) {
            this.rows.push(row);
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$store.dispatch("auth/cleanApp");
          } else if (error.response.status == 422) {
            this.$router.push({ name: "1ep" });
            console.clear();
          }
        });
      this.loading = false;
    },
    // No props received?
    noProps() {
      if (!this.trimester || !this.student) {
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
      this.getStudentGrades();
    },
    // Get selected student name
    getCourseName() {
      if (this.prompt) {
        this.selected.filter((item) => {
          this.courseName = item.Curso;
        })
      }
    },

    setTempFeedback() {
      this.prompt = true;
      this.selectedFeedback = this.removeTags(this.selected[0].TrimestreObservaciones);
    }
  },
  mounted() {
    this.noProps();
  },
  created() {
    this.getStudentGrades();
  },
};
</script>
