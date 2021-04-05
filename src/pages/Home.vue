<template>
  <span>
    <header class="">
      <nav class="navbar navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Location Between Addresses</a>
        </div>
      </nav>
    </header>
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Endereços</div>
            <div class="card-body">
              <form>
                <!-- não apague esse código -->
              </form>
              <div class="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
                <button @click="CreateInput()" class="btn btn-primary">+</button>
              </div>
              <button v-if="this.count > 1"
                type="button"
                class="btn btn-outline-primary"
                @click="GetCoordnates()"
              >
                Calcular
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-6">
          <div class="card">
            <div class="card-header">Google Maps</div>
            <div class="card-body">
              <div id="googleMap" style="width: 100%; height: 400px"></div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="row">
        <div class="col-md-12 mt-4">
          <div class="card">
            <div class="card-header">Distancia entre pontos <span style="color:#198754"> / Menor distancia - </span><span style="color:#dc3545"> Maior distancia</span></div>
            <div class="card-body">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Endereço 1</th>
                    <th scope="col">Endereço 2</th>
                    <th scope="col">Distancia</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import axios from "axios";
import helpers from "@/mixins/helpers.js";

export default {
  name: "home",
  mixins: [helpers],
  data() {
    return {
      addresses: [],
      count: 0,
      lat:-22.6751484,
      long:-43.254245
    };
  },
  mounted() {
    this.CreateInput();
    // this.loadJs('https://maps.googleapis.com/maps/api/js?key={key}=myMap',this.drawMap(this.lat, this.long))
  },
  methods: {
    greaterAndLesserDistance(){
      let distances = [];
      let min,max;
      $('.distance').each(function(index){

        distances.push($(this).text());
      })

      min = Math.min.apply(Math,distances);
      console.log('min',min)
      max = distances.length > 1 ? Math.max.apply(Math,distances) : false;

      $('.distance').each(function(index){
        if(min == $(this).text()){
          $(this).css('color','#198754');
        }
        if(max != false && max == $(this).text()){
          $(this).css('color','#dc3545');
        }
      })
    },
    drawMap(lat, long) {
      let mapProp = {
        center: new google.maps.LatLng(lat, long),
        zoom: 5,
      };
      let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      //
    },
    GetCoordnates() {
      let local = this;
      $("form input").each(function (index) {
        local.coordinate($(this).val(), index);
      });
      setTimeout(() => {
        this.calcBeteweenAdresses();
      }, 2000);
    },
    showRasult(selector, adresses_1, adresses_2, distance) {
      $(selector).append(` <tr>
                              <td>${adresses_1}</td>
                              <td>${adresses_2}</td>
                              <td class="distance">${distance}</td>
                            </tr>
      `);
    },
    euclideanFormula(index) {
      return Math.sqrt(
        Math.pow(
          sessionStorage.getItem("lat_" + index) -
            sessionStorage.getItem(`lat_${index - 1}`),
          2
        ) +
          Math.pow(
            sessionStorage.getItem("lng_" + index) -
              sessionStorage.getItem(`lng_${index - 1}`),
            2
          )
      );
    },
    calcBeteweenAdresses() {
      let percursoTotal = 0;
      for (let index = 0; index < this.count; index++) {
        if (index == 1 || index / 2 != 0) {
          percursoTotal += this.euclideanFormula(index);

          this.showRasult(
            "tbody",
            sessionStorage.getItem(`formatted_address_${index - 1}`),
            sessionStorage.getItem(`formatted_address_${index}`),
            percursoTotal
          );
        } else if (index >= 2 && index / 2 == 0) {
          percursoTotal += this.euclideanFormula(index);

          this.showRasult(
            "tbody",
            sessionStorage.getItem(`formatted_address_${index - 1}`),
            sessionStorage.getItem(`formatted_address_${index}`),
            percursoTotal
          );
        }
      }
      this.greaterAndLesserDistance();
    },
  },
};
</script>
