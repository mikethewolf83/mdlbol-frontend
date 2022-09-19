<template>
  <q-page padding>
    <div class="q-pa-md" v-if="loading">
      <div class="q-mx-xl q-pb-md">
        <q-item>
          <q-item-section>
            <q-skeleton type="rect" class="q-mb-md" />
            <q-skeleton type="text" />
          </q-item-section>
        </q-item>
      </div>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">
              <q-skeleton animation="fade" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="fade" type="text" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="fade" type="text" width="60%" />
            </td>
            <td class="text-right">
              <q-skeleton animation="fade" type="text" width="40%" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div v-else class="q-pa-md">
      <transition-group
        appear
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp"
      >
        <q-item class="text-center" key="fullname">
          <q-item-section :class="$q.platform.is.desktop ? 'text-h4' : 'text-h5'">
            {{ firstname + " " + lastname }}
          </q-item-section>
        </q-item>
        <div class="q-pb-md text-subtitle2 text-center" key="role-campus">
          {{ role + " de " + campus }}
        </div>
        <q-table
          key="courses-table"
          :grid="$q.platform.is.mobile ? true : false"
          square
          title='Como "Profesor" en'
          :rows="rows"
          :columns="columns"
          :row-key="(row) => row.index"
          color="primary"
          :class="$q.platform.is.desktop ? 'q-mx-xl' : 'q-mx-md'"
        />
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { SessionStorage, createMetaMixin } from "quasar";
export default {
  name: "Profile",

  data() {
    const columns = [
      {
        name: "CatCurso",
        align: "left",
        label: "Grupo",
        field: (row) => row.CatCurso,
        sortable: true,
        style: "width: 30%",
      },
      {
        name: "Curso",
        align: "left",
        label: "Asignatura",
        field: (row) => row.Curso,
        sortable: true,
      },
    ];
    const rows = [];
    const loading = false;
    const firstname = "";
    const lastname = "";
    const role = "";
    const campus = "";
    return {
      columns,
      rows,
      loading,
      firstname,
      lastname,
      role,
      campus,
    };
  },
  mixins: [
    createMetaMixin(() => {
      return {
        title: "BM - Perfil de usuario"
      };
    }),
  ],
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    async getProfile() {
      this.loading = true;
      let user = SessionStorage.getItem("user");

      if (user) {
        this.firstname = SessionStorage.getItem("user").firstname;
        this.lastname = SessionStorage.getItem("user").lastname;
        this.role = SessionStorage.getItem("user").profile.role;
        this.campus = SessionStorage.getItem("user").profile.campus;
        for (const row of SessionStorage.getItem("user").courses.list) {
          this.rows.push(row);
        }
      } else {
        await this.$store.dispatch("auth/profile");
        this.firstname = this.user.data.firstname;
        this.lastname = this.user.data.lastname;
        this.role = this.user.data.profile.role;
        this.campus = this.user.data.profile.campus;
        for (const row of this.user.data.courses.list) {
          this.rows.push(row);
        }
      }
      this.loading = false;
    },
  },
  created() {
    this.getProfile();
  },
};
</script>
