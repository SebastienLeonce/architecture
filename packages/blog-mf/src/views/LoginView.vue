<template>
  <main>
    <!-- <el-empty :image-size="200" /> -->
    <div>
      <p>{{status}}</p>
      <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="Username">
          <el-input v-model="data.username" style="color: white;"/>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="data.password" type="password" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <el-button @click="login()" style="position: absolute; left: 40%; width: 20%;">Login</el-button>
    </div>
    
  </main>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import { UserStore } from '../stores/UserStore';

interface LoginForm {
    username: string;
    password: string;
}


const userStore = UserStore();
const status = ref('')

const data = reactive<LoginForm>({
    username: userStore.username_,
    password: ''
})

const login = () => {
  userStore.login(data.username, data.password); 
  status.value = userStore.status_;
}

</script>