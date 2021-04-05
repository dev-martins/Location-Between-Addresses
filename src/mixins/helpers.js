import axios from "axios";
export default {
    ata() {
        return {
          coordinates: [],
        };
      },
    methods: {
        loadJs(url, callback) {
            jQuery.ajax({
                url: url,
                dataType: "script",
                success: callback,
                async: true,
            });
        },
        CreateInput() {
            $("form").append(`<div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      >${this.count + 1}° endereço</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="ex: Av. Rio Branco, 1 Centro, Rio de Janeiro RJ,20090 003"
                      
                    />
                  </div>`);

            $("form input:last-of-type").focus();
            this.count++
        },
        coordinate(addresses,index) {
            sessionStorage.clear();
            axios
                .get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${addresses}&key=AIzaSyC3MnLe9SVz-CVRvrWt2gt2N147T-BSyCk&callback`,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    sessionStorage.setItem(`lat_${index}`,res.data.results[0].geometry
                    .location.lat /*res.data.results[0].geometry.location.lat*/)
                    sessionStorage.setItem(`lng_${index}`,res.data.results[0].geometry
                    .location.lng /*res.data.results[0].geometry.location.lat*/)
                    sessionStorage.setItem(`formatted_address_${index}`,res.data.results[0].formatted_address
                     /*res.data.results[0].geometry.location.lat*/)

                })
                .catch((erro) => {
                    Vue.$toast.open({
                        message: erro.message,
                        type: "error",
                        position: "top-right",
                    });
                });
        },
    }
}