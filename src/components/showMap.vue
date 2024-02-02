
  <template>
    <div>
      <Norway_heatmap></Norway_heatmap>
      <Norway_scattermap></Norway_scattermap>
    </div>
  </template>
  
  
  <script>
  import Papa_parse from "@/components/papa_parse";
  import Norway_godownmap from "@/components/Norway_godownmap";
  import Norway_scattermap from "@/components/norway_scattermap";
  import GMapTest from "@/components/gMapTest";
  import BmapScatter from "@/components/BmapScatter";
  import Norway_heatmap from "@/components/norway_heatmap";
  export default {
    name: 'App',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Norway_heatmap,
      // eslint-disable-next-line vue/no-unused-components
      BmapScatter,
      // eslint-disable-next-line vue/no-unused-components
      GMapTest,
      // eslint-disable-next-line vue/no-unused-components
      Norway_scattermap,
      // eslint-disable-next-line vue/no-unused-components
      Norway_godownmap,
      // eslint-disable-next-line vue/no-unused-components
      // eslint-disable-next-line vue/no-unused-components
      Papa_parse,
  
    }
  }
  </script>
  
  <style>
  #app {
    /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
  </style>
  