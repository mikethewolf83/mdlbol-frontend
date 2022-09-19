<template>
  <q-page padding>
    <GradeLanding
      :trimester="trimester"
      :students="students"
      :courses="courses"
      :landingGetter="landingGetter"
      :loading="loading"
      tabLanding="students"
      title="Calificaciones de 2 EP"
      routeStudent="2epStudent"
      routeGroup="2epGroup"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { createMetaMixin } from "quasar";
import GradeLanding from "../../../components/GradeLanding";
export default {
  name: "TwoEP",
  components: {
    GradeLanding,
  },
  props: {
    trimester: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      students: [],
      courses: [],
      loading: false,
    };
  },
  mixins: [
    createMetaMixin(() => {
      return {
        title: "BM - Calificaciones de 2 EP",
      };
    }),
  ],
  computed: {
    ...mapGetters("primaria", ["landingGetter"]),
  },
  methods: {
    ...mapActions("primaria", ["getLanding"]),
    ...mapMutations("primaria", ["SET_LANDING"]),

    // Get all students and courses from group
    async getLandingData() {
      if (this.landingGetter != null) {
        this.loading = true;
        for (const el of this.landingGetter.students.list) {
          this.students.push({
            id: el.id,
            fullname: el.firstname + " " + el.lastname,
          });
        }
        for (const el of this.landingGetter.courses.list) {
          this.courses.push({
            id: el.course_id,
            course: el.course,
          });
        }
        this.loading = false;
      } else {
        this.loading = true;
        await this.getLanding({
          group: "2ep",
        }).then(() => {
          for (const el of this.landingGetter.students.list) {
            this.students.push({
              id: el.id,
              fullname: el.firstname + " " + el.lastname,
            });
          }
          for (const el of this.landingGetter.courses.list) {
            this.courses.push({
              id: el.course_id,
              course: el.course,
            });
          }
          this.loading = false;
        });
      }
    },
  },
  created() {
    this.SET_LANDING(null);
    this.getLandingData();
  },
};
</script>
