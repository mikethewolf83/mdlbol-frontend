<template>
  <q-btn flat round icon="more_vert">
    <q-menu
      fit
      auto-close
      square
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-list>
        <q-item clickable @click="dialogAbout = true">
          <q-item-section avatar>
            <q-icon name="perm_device_information" size="25px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Acerca de Boletines</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="dialogExtended = true">
          <q-item-section avatar>
            <q-icon name="read_more" size="25px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Saber más</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <!-- Acerca de -->
  <q-dialog v-model="dialogAbout">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="~assets/logo.png" />
        </q-avatar>

        <q-toolbar-title>
          Boletines
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <div class="q-mb-xs text-center text-bold">MdlBol v{{ version }}</div>

        <div class="text-center">
          Aplicación a la medida, para la gestión y control de los boletines de
          notas de los estudiantes del Centro Educativo Español de La Habana.
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-bold text-center">Autor</div>

        <div class="q-mt-xs text-center">
          Maikel Nieves Matamoros
          <q-btn dense flat rounded size="10px" icon="link" @click="openLink('https://github.com/mikethewolf83/mdlbol-frontend')"/>
          GitHub
          <br>
          <div class="q-mt-xs text-bold">Licencia</div>
          MIT License Copyright &copy; 2021
        </div>


        <div class="q-mt-md text-center">
          <q-btn
            dense
            flat
            color="primary"
            label="Saber más"
            icon="read_more"
            @click="(dialogExtended = true), (dialogAbout = false)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Saber más -->
  <q-dialog
    v-model="dialogExtended"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-item>
          <q-item-section>
            <q-item-label class="text-uppercase"
              >Acerca de Boletines</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6 text-center">Boletines de Moodle</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="q-pt-none">
        <q-scroll-area style="height: 80vh; max-width: 100%">
          <div class="text-center">
            <div class="q-mt-sm text-bold">
              Un poco de historia… ¿Y por qué no?
            </div>
            <div class="q-mt-sm">
              La aplicación “Boletines de Moodle”, nombre en código “mdlbol”,
              surge como herramienta para automatizar la gestión, generación y
              control de los boletines de notas trimestrales que se emiten por
              el CEEH a los estudiantes y sus familias. En un principio se
              desarrolló, solo en 15 días, una aplicación como solución
              informática temporal, empleando tecnologías de desarrollo web
              tales como, el lenguaje de programación <q-btn dense color="primary" flat rounded size="10px" icon="link" label="PHP" @click="openLink('https://www.php.net/')"/> el cual es
              un lenguaje de código abierto, muy popular especialmente adecuado
              para el desarrollo web y que puede ser incrustado en HTML. Se
              desarrolló empleando el marco de trabajo ó <q-btn dense color="primary" flat rounded size="10px" icon="link" label="framework" @click="openLink('https://es.wikipedia.org/wiki/Framework')"/>
              de PHP, denominado <q-btn dense color="primary" flat rounded size="10px" icon="link" label="Pop PHP" @click="openLink('https://www.popphp.org/')"/>.
            </div>
            <div class="q-mt-sm">
              Esta primera aplicación cubrió las necesidades básicas de la
              gestión de los boletines, pero debido a la necesidad de una
              solución rápida, se pudo cubrir solo algunos aspectos necesarios.
              De esta aplicación se liberaron varias versiones, añadiendo
              funcionalidades, desde la v0.1.3 hasta la v0.1.9. Esta aplicación
              se encuentra alojada en un repositorio de GitHub <q-btn dense color="primary" flat rounded size="10px" icon="link" label="mdlbol" @click="openLink('https://github.com/mikethewolf83/mdlbol')"/>, el cual se encuentra archivado y congelado para la posteridad,
              sin futuro desarrollo, debido a la nueva versión, reescrita
              totalmente y empleando tecnologías modernas.
            </div>
            <div class="q-mt-sm text-bold">¿Y la nueva versión?</div>
            <div class="q-mt-sm">
              Para la nueva versión se separó la parte del manejo de datos, o 
              <q-btn dense color="primary" flat rounded size="10px" icon="link" label="lógica de negocio" @click="openLink('https://es.wikipedia.org/wiki/L%C3%B3gica_de_negocio')"/>
              de la interfaz gráfica de usuario, a esta forma de desarrollo se
              le conoce como "Backend y Frontend". Se empleó, para el backend el
              microframework de PHP <q-btn dense color="primary" flat rounded size="10px" icon="link" label="Lumen" @click="openLink('https://lumen.laravel.com/')"/>, el
              cual se promociona a si mismo como: Microservicios y API
              ultrarrápidos entregados con la elegancia que espera. El backend
              se encuentra alojado en el repositorio  <q-btn dense color="primary" flat rounded size="10px" icon="link" label="mdlbol-backend" @click="openLink('https://github.com/mikethewolf83/mdlbol-backend')"/>. Para el frontend se empleó un framework de
              <q-btn dense color="primary" flat rounded size="10px" icon="link" label="Javascript" @click="openLink('https://developer.mozilla.org/es/docs/Web/JavaScript')"/>, denominado
              <q-btn dense color="primary" flat rounded size="10px" icon="link" label="Quasar" @click="openLink('https://quasar.dev/')"/>, basado
              en <q-btn dense color="primary" flat rounded size="10px" icon="link" label="Vue" @click="openLink('https://github.com/mikethewolf83/mdlbol-frontend')"/>, ambos
              súper establecidos en el mundillo del desarrollo web, este se
              encuentra alojado en el repositorio <q-btn dense color="primary" flat rounded size="10px" icon="link" label="mdlbol-frontend" @click="openLink('https://github.com/mikethewolf83/mdlbol-frontend')"/>.
              Con este nuevo diseño se garantiza la escalabilidad del
              proyecto, en un futuro próximo, si las condiciones se presentan.
            </div>
            <div class="q-mt-sm text-bold">Información importante</div>
            <div class="q-mt-sm">
              Esta aplicación es, Software Libre, bajo los términos de la
              licencia MIT, puede ver una copia de esta licencia en el
              repositorio antes mencionado y también en esta aplicación.
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { openURL } from "quasar";
export default {
  name: "TopMenu",
  data() {
    return {
      dialogAbout: false,
      dialogExtended: false,
      version: this.$version,
    };
  },
  methods: {
    openLink(url) {
      openURL(url);
    },
  },
};
</script>
