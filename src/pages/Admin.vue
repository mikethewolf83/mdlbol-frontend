<template>
  <q-page padding>
    <transition-group
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <q-item class="text-center" key="page-title">
        <q-item-section :class="$q.platform.is.desktop ? 'text-h4' : 'text-h5'">
          Usuarios de Boletines
        </q-item-section>
      </q-item>
      <div class="q-pa-lg" key="table-users">
        <q-table
          :grid="$q.platform.is.mobile ? true : false"
          square
          :rows="rows"
          :columns="columns"
          :row-key="(row) => row.id"
          selection="single"
          v-model:selected="selected"
          :filter="filter"
          color="primary"
          :loading="loading"
        >
          <template v-slot:top-left>
            <q-btn
              :class="$q.platform.is.desktop ? 'q-mx-xl' : 'q-mx-xl q-mb-lg'"
              round
              color="primary"
              icon="person_add_alt_1"
              @click="prompt = true"
            >
              <q-tooltip> Agregar usuario </q-tooltip>
            </q-btn>

            <q-btn
              :class="$q.platform.is.desktop ? 'q-mx-xl' : 'q-mx-xl q-mb-lg'"
              round
              color="negative"
              icon="delete"
              v-if="selected.length > 0"
              @click="deleteSelectedProfile"
            >
              <q-tooltip> Eliminar usuario seleccionado </q-tooltip>
            </q-btn>

            <q-btn
              :class="$q.platform.is.desktop ? 'q-mx-xl' : 'q-mx-xl q-mb-lg'"
              round
              disable
              color="negative"
              icon="delete"
              v-else
            />
          </template>

          <template v-slot:top-right>
            <q-input
              square
              :class="$q.platform.is.desktop ? 'q-mx-xl' : 'q-mx-xl q-mb-xl'"
              debounce="300"
              v-model="filter"
              label="Buscar"
              clearable
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-selection="scope">
            <q-toggle color="negative" v-model="scope.selected" />
          </template>
        </q-table>
      </div>
    </transition-group>

    <q-dialog v-model="prompt" persistent square position="top">
      <q-card style="min-width: 60%">
        <q-card-section>
          <div class="text-h6">Seleccione el profesor a agregar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            autofocus
            use-chips
            use-input
            v-model="profile.id"
            emit-value
            input-debounce="300"
            :options="inputProfessorOptions"
            @filter="filterProfessors"
            :rules="[required]"
            hint="Seleccione el profesor o escriba el nombre para filtrar"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-select
            use-chips
            v-model="profile.campus"
            :options="inputCampusOptions"
            :rules="[required]"
            hint="Seleccione la sede"
          />
          <q-select
            use-chips
            v-model="profile.role"
            :options="inputRoleOptions"
            :rules="[required]"
            hint="Seleccione el rol"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            round
            icon="block"
            color="negative"
            class="q-mr-lg q-mb-md"
            v-close-popup
            @click="clearForm"
          >
            <q-tooltip> Cancelar </q-tooltip>
          </q-btn>
          <q-btn
            round
            icon="save"
            color="primary"
            class="q-mr-lg q-mb-md"
            v-close-popup
            @click="createProfile(profile)"
          >
            <q-tooltip> Guardar </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { createMetaMixin } from "quasar";
export default {
  name: "Admin",

  data() {
    const columns = [
      {
        name: "id",
        align: "left",
        label: "ID Boletines",
        field: (row) => row.id,
        format: (val) => val,
        sortable: true,
        style: "width: 10%",
      },
      {
        name: "mdl_user_id",
        align: "left",
        label: "ID Moodle",
        field: "mdl_user_id",
        sortable: true,
        style: "width: 10%",
      },
      {
        name: "campus",
        align: "left",
        label: "Sede",
        field: "campus",
        sortable: true,
      },
      {
        name: "role",
        align: "left",
        label: "Rol de usuario",
        field: "role",
        sortable: true,
      },
      {
        name: "firstname",
        align: "left",
        label: "Nombre",
        field: (row) => row.user.firstname + " " + row.user.lastname,
        sortable: false,
        style: "width: 40%",
      },
    ];

    return {
      columns,
      rows: [],
      selected: [],
      loading: false,
      filter: "",
      prompt: false,
      stringInputOptions: [],
      inputProfessorOptions: this.stringInputOptions,
      inputCampusOptions: ["ESCUELA", "PRIMARIA", "INSTITUTO"],
      inputRoleOptions: [
        "Admin",
        "Manager",
        "Profesor",
        "Supervisor EP",
        "Supervisor ESO",
        "Supervisor BACH",
      ],
      profile: {
        id: null,
        campus: "",
        role: "",
      },
    };
  },
  mixins: [
    createMetaMixin(() => {
      return {
        title: "BM - Área de administración"
      };
    }),
  ],
  computed: {
    ...mapGetters("admin", ["profilesGetter", "professorsGetter"]),
  },
  methods: {
    ...mapActions("admin", [
      "profilesList",
      "deleteProfile",
      "professorsList",
      "newProfile",
    ]),

    // Clear form fileds
    clearForm() {
      this.profile.id = null;
      this.profile.campus = "";
      this.profile.role = "";
    },

    // Form rules
    required(val) {
      return (val && val.length > 0) || "Este campo no puede estar vacío";
    },

    // Filter professors in input field
    filterProfessors(val, update, abort) {
      update(() => {
        this.inputProfessorOptions = this.stringInputOptions.filter(
          (v) => v.label.indexOf(val) > -1
        );
      });
    },

    // Create a new profile
    async createProfile(profile) {
      await this.newProfile(profile).then(() => {
        this.$router.go();
      });
    },

    // Get professors list and populate select
    async getProfessorsList() {
      if (this.professorsGetter != null) {
        for (const el of this.professorsGetter) {
          this.stringInputOptions.push({
            label: el.fullname,
            value: el.id,
          });
        }
      } else {
        await this.professorsList();
        for (const el of this.professorsGetter) {
          this.stringInputOptions.push({
            label: el.fullname,
            value: el.id,
          });
        }
      }
    },

    // Get profiles list and papulate table rows
    async getProfilesList() {
      this.loading = true;
      if (this.profilesGetter != null) {
        for (const row of this.profilesGetter) {
          this.rows.push(row);
        }
      } else {
        await this.profilesList();
        for (const row of this.profilesGetter) {
          this.rows.push(row);
        }
      }
      this.loading = false;
    },

    // Delete selected profile in table
    async deleteSelectedProfile() {
      let self = this;
      await this.selected.filter((item) => {
        // self.rows.splice(self.rows.indexOf(item), 1);
        this.deleteProfile({
          id: item.id,
        });
      })
      this.$router.go();
    },
  },
  created() {
    this.getProfilesList();
    this.getProfessorsList();
  },
};
</script>
