<template>
  <b-container >

    <b-card-group >
      <b-card 
        border-variant="primary"
        header="FRIEND LIST"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
        
      >

      
        <b-card-body style="height: 500px; position:relative; overflow-y:scroll;">
          <draggable group="a">
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              1
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              2
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              3
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              4
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              5
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              6
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              7
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              8
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              9
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              10
            </div>
          </draggable> 
        </b-card-body>

        <b-card-footer>
          <b-button  variant="outline-primary">
            <a href="https://oauth.vk.com/authorize?client_id=8134875&display=page&redirect_uri=http://localhost:8080/#/&scope=friends&response_type=token&v=5.52">Login in</a>
          </b-button>
        </b-card-footer>
      </b-card>



      <b-card 
        border-variant="primary"
        header="SELECTED FRIENDS"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >

        <b-card-body style="height: 500px; position:relative; overflow-y:scroll;">
          <draggable group="a">
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              1
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              2
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              3
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              4
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              5
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              6
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              7
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              8
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              9
            </div>
            <div style="border: 1px solid gray; margin-bottom: 10px;">
              10
            </div>
          </draggable> 
        </b-card-body>

        <b-card-footer>
          <b-button variant="outline-primary">Export to console</b-button>
        </b-card-footer>
      </b-card>

      
    </b-card-group>

  </b-container>



</template>

<script>
import draggable from 'vuedraggable';
import axios from 'axios'

export default {
  components: { draggable },
  methods: {
    getToken() {
      //https://oauth.vk.com/authorize?client_id=8134875&display=page&redirect_uri=http://localhost:8080/#/&scope=friends&response_type=token&v=5.52
      axios.get('https://oauth.vk.com/authorize', {
        params: {
          client_id: 8134875,
          display: 'page',
          redirect_uri: '',
          scope: 'friends',
          response_type: 'token',
          v: 5.52
        }
      } )
    }
  }
}
</script>
