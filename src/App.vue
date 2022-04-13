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
          <div v-show="this.loadFriends">Загрузка списка друзей...</div>
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
import jsonp from 'jsonp';

VK.init({apiId:8135174});

export default {
  components: { draggable },

  data() {
    return {
      loadFriends: false,
    }
    
  },

  methods: {
    
    login() {

      this.loadFriends = true;

      VK.Auth.login(function(response) {

        jsonp(`https://api.vk.com/method/friends.get?count=60&fields=nickname,photo_50&access_token=${response.session.sid}&v=5.131`, function(err, data) {
          if (err) {
            console.log('Error ',err.message);
          } else {
            localStorage.setItem('users', JSON.stringify( data.response.items));
          }
        });
        setTimeout(() => {
          location.reload();
          this.loadFriends = false;
        }, 2000);

      });

    },

    saveSelected() {

      if (this.selectFriends.length > 0) {
        localStorage.setItem('selectFriends', JSON.stringify(this.selectFriends));
        this.$store.dispatch('saveSelected');
        console.log('Selected friends');
        this.selectFriends.forEach(element => {
          console.log(element.first_name, element.last_name)
        });
      } else {
        console.log('Список пуст!')
      }
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
