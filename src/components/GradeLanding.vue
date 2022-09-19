<template>
  <transition-group
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <div class="row justify-center q-px-lg q-pb-md" key="page-grid">
        <div class="col"></div>
        <div class="col-lg-6 col-md-10 col-sm-12 col-xs-12">
          <q-item class="q-pa-lg text-center">
            <q-item-section
              :class="$q.platform.is.desktop ? 'text-h4' : 'text-h5'"
            >
              {{ title }}
            </q-item-section>
          </q-item>

          <div class="row text-center q-pb-md">
            <div class="col">
              <q-radio
                v-model="trimester"
                val="I"
                :label="$q.platform.is.desktop ? 'Primer Trimestre' : '1T'"
              />
            </div>
            <div class="col">
              <q-radio
                v-model="trimester"
                val="II"
                :label="$q.platform.is.desktop ? 'Segundo Trimestre' : '2T'"
              />
            </div>
            <div class="col">
              <q-radio
                v-model="trimester"
                val="III"
                :label="$q.platform.is.desktop ? 'Tercer Trimestre' : '3T'"
              />
            </div>
          </div>

          <transition
            appear
            leave-active-class="animated fadeOutUp"
          >
            <q-banner class="text-white bg-red text-center" v-if="!trimester">
              Debes seleccionar un trimestre
            </q-banner>
          </transition>

          <q-card>
            <q-tabs
              v-model="tabLanding"
              class="text-grey"
              align="center"
              active-color="primary"
              indicator-color="primary"
              dense
            >
              <q-tab
                name="students"
                :label="
                  landingGetter
                    ? 'Estudiantes: ' + landingGetter.students.total
                    : 'Estudiantes'
                "
                icon="people"
              />
              <q-tab
                name="courses"
                :label="
                  landingGetter
                    ? 'Asignaturas: ' + landingGetter.courses.total
                    : 'Asignaturas'
                "
                icon="school"
              />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabLanding" animated class="text-center">
              <q-tab-panel name="students">
                <q-list separator dense v-if="trimester">
                  <q-item
                    clickable
                    v-ripple
                    v-for="item in students"
                    :key="item.id"
                    :to="{
                      name: routeStudent,
                      params: { trimester, student: item.id },
                    }"
                  >
                    <q-item-section>{{ item.fullname }}</q-item-section>
                  </q-item>
                </q-list>

                <div class="q-pa-xl" v-if="loading">
                  <q-inner-loading :showing="loading">
                    <q-spinner-facebook size="100px" color="primary" />
                  </q-inner-loading>
                </div>
              </q-tab-panel>

              <q-tab-panel name="courses">
                <q-list separator dense v-if="trimester">
                  <q-item
                    clickable
                    v-ripple
                    v-for="item in courses"
                    :key="item.id"
                    :to="{
                      name: routeGroup,
                      params: { trimester, course: item.id },
                    }"
                  >
                    <q-item-section>{{ item.course }}</q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <div class="col"></div>
      </div>
    </transition-group>
</template>

<script>
export default {
  name: "GradeLanding",
  props: {
    trimester: {
      type: String,
      required: false,
    },
    students: {
      type: Array,
      required: true
    },
    courses: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    landingGetter: {
      type: null,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    routeStudent: {
      type: String,
      required: true
    },
    routeGroup: {
      type: String,
      required: true
    },
    tabLanding: {
      type: String,
      required: true
    }
  },

  setup() {
    return {};
  }
};
</script>
