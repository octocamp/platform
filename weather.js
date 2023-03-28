/**
 * This pen uses OpenWeatherMap weather API
 * https://openweathermap.org/
 */



/*******************************************
 * GLOBAL COMPONENTS
 *******************************************/

// DISPLAY
Vue.component('display', { 
  props: ['res'],
  template: `
    <section class="display">
      <h2>{{ res.name }}, {{ res.sys.country }}</h2>
      <h5>
        <span>Lat:</span> {{ res.coord.lat }}
        <span>Lon: {{ res.coord.lon }}</span>
      </h5>
      <div class="condition">
        <div class="temp">{{ temperature }}°C</div>
        <img v-bind:src="'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/' + res.weather[0].icon + '.png'" 
               v-bind:alt="'Weather in ' + res.name" 
               width="128" height="128">
        <p class="text">{{ res.weather[0].description }}</p>
      </div>
    </section>
   `,
   computed: {
    temperature(){
      //Remove decimals on temperature value
      var temp = this.res.main.temp,
          noDecimals = temp.toFixed();

      return noDecimals;
    }
  }
});

// ACTIONS
Vue.component('actions', {
  props: ['location'],
  data(){
    return{
      isSearching: false  
    }
  },
  template: `
  <section class="actions">
    <div class="togglSearch" v-bind:class="{'active': isSearching}" @click="isSearching = ! isSearching">
      <span v-if="!isSearching">Search</span>
      <span v-else>Close</span>
    </div>
    <div v-bind:class="{'active': isSearching}" class="panel"> 
      <input type="text" v-model="location">
      <button @click="search"><i class="material-icons">search</i></button> 
    </div>
  </section>
`,
 methods: {
   search(){
     this.$emit('search', this.location);
     this.isSearching = false;
   }
 }
});



/*******************************************
 * ROOT COMPONENT
 *******************************************/
var app = new Vue({
  el: '#app',
  data: {
    appTitle: 'Octo Weather App',
    dataApi: 'aae97860de78632108ecc73036d6d17c',
    cityName: 'new york',
    lang: 'en',
    weatherRes: null
  },
  
  // GET DATA WHEN MOUNTED
  mounted(){
    this.performAJAX();
  },
  
  // METHODS
  methods: {
    // SEARCH A NEW CITY
    searchcity(city){
      this.cityName = city;
      var ctx = this;
      ctx.performAJAX();
    },
    
    // GET WEATHER DATA
    performAJAX(){
      var ctx = this;
    
      axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + 
                ctx.cityName + '&units=metric&lang=' + 
                ctx.lang + '&APPID=' + ctx.dataApi )
      .then(function (response) { 
        ctx.weatherRes = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
});