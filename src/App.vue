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
          <draggable v-model="friends" group="a">
            <div 
              v-for="user in friends" :key="user.id"
              style="border: 1px solid gray; margin-bottom: 10px; display: flex; align-items: center; padding: 10px;"
            >
              <img :src="user.photo_50" alt="">
              <div style="margin-left: 20px; font-size: 26px">
                {{ user.first_name }} {{ user.last_name }}
              </div>
            </div>
            
          </draggable> 
        </b-card-body>

        <b-card-footer v-show="this.$store.getters.users.length == 0">
          <b-button @click="login"  variant="outline-primary">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25684.png" style="width: 25px; height: 25px; margin-right: 10px;" alt="">
           Login in
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
          <draggable v-model="selectFriends" group="a">
            <div 
              v-for="user in selectFriends" :key="user.id"
              style="border: 1px solid gray; margin-bottom: 10px; display: flex; align-items: center; padding: 10px;"
            >
              <img :src="user.photo_50" alt="">
              <div style="margin-left: 20px; font-size: 26px">
                {{ user.first_name }} {{ user.last_name }}
              </div>
            </div>
            
          </draggable> 
        </b-card-body>

        <b-card-footer>
          <b-button @click="saveSelected" variant="outline-primary">Export to console</b-button>
        </b-card-footer>
      </b-card>

      
    </b-card-group>

  </b-container>



</template>

<script>
import draggable from 'vuedraggable';
import VK from 'vk-openapi';

VK.init({apiId:8135174});

export default {
  components: { draggable },

  methods: {
    
    login() {
      this.$store.dispatch('login');
    },

    saveSelected() {

      this.$store.dispatch('saveSelected', this.selectFriends);
      
     }

  },

  computed: {
    friends: {
      get() {
        return this.$store.getters.users;
      },
      set(value) {
        this.$store.dispatch('updateList',{value, list: 'friends'});
      }
    },
    selectFriends: {
      get() {
        return this.$store.getters.selectUsers;
      },
      set(value) {
        this.$store.dispatch('updateList',{value, list: 'selected'});
      }
    }
  },

  

}
</script>
