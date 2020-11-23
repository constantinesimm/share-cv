<template>
  <el-form
    :model="formData"
    :rules="validateRules"
    ref="LoginForm"
    class="auth-form"
    label-position="top"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="formData.email" size="mini"/>
    </el-form-item>

    <el-form-item :label="$t('app.auth.passInput')" prop="secret">
      <el-input show-password v-model="formData.secret" size="mini"/>
    </el-form-item>

    <el-form-item style="margin-top: 55px">
      <el-button
        @click="submitForm('LoginForm')"
        :loading="isFormSubmitted"
        class="auth-form__submit"
        type="success"
        plain round size="mini"
      >
        {{ $t('app.auth.loginSubmit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import validator from '@/libs/validator';

  export default {
    name: 'UserLoginForm',
    data() {
      return {
        isFormSubmitted: false,
        validateRules: {
          email: validator.email,
          secret: validator.secret
        },
        formData: {
          email: null,
          secret: null
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.isFormSubmitted = true;

            this.$store.dispatch('auth/login', this.formData)
              .then(response => {
                this.$message.success(response.message);
                this.$router.push({ name: 'dashboard' });
              })
              .catch(error => this.$message.error(error.message))
              .finally(() => this.isFormSubmitted = false)

          } else return false
        })
      }
    }
  }
</script>
