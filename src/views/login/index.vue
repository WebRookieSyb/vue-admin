<template>
  <div class="login-container">
    <el-form
      ref="login-form"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">login</h3>
      </div>
      <el-form-item>
        <span>
          <svg-icon name="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          autocomplete="on"
          placeholder="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="password"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        Sign in
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Router } from 'vue-router'
import { Dictionary } from 'vuex'
import { }

</script>
