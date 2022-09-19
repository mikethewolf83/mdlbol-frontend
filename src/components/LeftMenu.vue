<template>
  <div class="q-pa-xs">
    <!-- Perfiles -->
    <q-item exact clickable :to="{ name: 'profile' }">
      <q-item-section avatar>
        <q-icon name="face" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Perfil</q-item-label>
      </q-item-section>
    </q-item>
    <q-list>
      <!--#### PRIMARIA ####-->
      <q-expansion-item expand-separator icon="school" label="Primaria">
        <!-- 1 EP -->
        <q-item exact clickable :to="{ name: '1ep', params: { trimester }}" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_one" />
          </q-item-section>

          <q-item-section>
            <q-item-label>EP</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 2 EP -->
        <q-item exact clickable :to="{ name: '2ep', params: { trimester }}" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_two" />
          </q-item-section>

          <q-item-section>
            <q-item-label>EP</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 3 EP -->
        <q-item exact clickable :to="{ name: '3ep', params: { trimester }}" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_3" />
          </q-item-section>

          <q-item-section>
            <q-item-label>EP</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 4 EP -->
        <q-item exact clickable :to="{ name: '4ep' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_4" />
          </q-item-section>

          <q-item-section>
            <q-item-label>EP</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 5 EP -->
        <q-item exact clickable :to="{ name: '5ep' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_5" />
          </q-item-section>

          <q-item-section>
            <q-item-label>EP</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 6 EP -->
        <q-item exact clickable :to="{ name: '6ep' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_6" />
          </q-item-section>

          <q-item-section>
            <q-item-label>EP</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <!--#### ESO ####-->
      <q-expansion-item expand-separator icon="school" label="Secundaria">
        <!-- 1 ESO -->
        <q-item exact clickable :to="{ name: '1eso' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_one" />
          </q-item-section>

          <q-item-section>
            <q-item-label>ESO</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 2 ESO -->
        <q-item exact clickable :to="{ name: '2eso' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_two" />
          </q-item-section>

          <q-item-section>
            <q-item-label>ESO</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 3 ESO -->
        <q-item exact clickable :to="{ name: '3eso' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_3" />
          </q-item-section>

          <q-item-section>
            <q-item-label>ESO</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 4 ESO -->
        <q-item exact clickable :to="{ name: '4eso' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_4" />
          </q-item-section>

          <q-item-section>
            <q-item-label>ESO</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <!--#### BACH ####-->
      <q-expansion-item expand-separator icon="school" label="Bachillerato">
        <!-- 1 BACH -->
        <q-item exact clickable :to="{ name: '1bach' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_one" />
          </q-item-section>

          <q-item-section>
            <q-item-label>BACH</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 2 BACH -->
        <q-item exact clickable :to="{ name: '2bach' }" class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="looks_two" />
          </q-item-section>

          <q-item-section>
            <q-item-label>BACH</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <!-- Admin -->
      <q-item exact clickable :to="{ name: 'admin' }">
        <q-item-section avatar>
          <q-icon name="admin_panel_settings" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Administración</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LeftMenu",

  data() {
    return {
      trimester: ""
    };
  },
  methods: {
    currentTrimester() {
      const d = new Date();
      let currentMonth = d.getMonth() + 1;

      if (currentMonth == 9 || currentMonth == 10 || currentMonth == 11) {
        this.trimester = "I";
      } else if (currentMonth == 12 || currentMonth == 1 || currentMonth == 2 || currentMonth == 3) {
        this.trimester = "II";
      } else {
        this.trimester = "III";
      }
    }
  },
  mounted() {
    this.currentTrimester();
  }
};
</script>
