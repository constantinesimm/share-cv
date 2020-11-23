<template>
  <el-form
    v-if="!isFailedToken"
    :model="formData"
    :rules="validateRules"
    ref="UserCompleteForm"
    class="auth-form"
    label-position="top"
  >
    <el-form-item :label="$t('app.auth.passInput')" prop="secret">
      <el-input show-password v-model="formData.secret" size="mini"/>
    </el-form-item>

    <el-form-item :label="$t('app.auth.passConfirmInput')" prop="confirmSecret">
      <el-input show-password v-model="formData.confirmSecret" size="mini"/>
    </el-form-item>

    <el-form-item style="margin-top: 55px">
      <el-button
        @click="submitForm('UserCompleteForm')"
        :loading="isFormSubmitted"
        class="auth-form__submit"
        type="success"
        plain round
        size="mini">

        {{ $t('app.auth.actionSubmit') }}

      </el-button>
    </el-form-item>
  </el-form>
  <div v-else aria-labelledby="swal2-title" aria-describedby="swal2-content" class="swal2-popup swal2-modal swal2-icon-error swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true" style="display: flex;">
    <div class="swal2-header">
      <h2 class="swal2-title" id="swal2-title">
        {{ $t('app.auth.actionAlertForbidden') }}
      </h2>
      <div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;">
        <span class="swal2-x-mark">
          <span class="swal2-x-mark-line-left"></span>
          <span class="swal2-x-mark-line-right"></span>
        </span>
      </div>
    </div>
    <div id="swal2-content" class="swal2-html-container" style="display: block;">
      <div class="mb-3">
        {{ $t('app.auth.actionAlertReason') }}
      </div>
      <el-link type="text" href="/admin/login">
        {{ $t('app.auth.loginLink') }}
      </el-link>
    </div>
  </div>
</template>

<script>
  import validator from '@/libs/validator';

  export default {
    name: 'AuthActionForm',
    data() {
      const comparePasswordsRule = (rule, value, callback) => {
        return value === this.formData.secret ? callback() : callback(this.$t('validate.passConfirm.compare'))
      };

      return {
        validateRules: {
          email: validator.email,
          secret: validator.secret,
          confirmSecret: [
            { required: true, message: this.$t('validate.inputRequired') },
            { validator: comparePasswordsRule }
          ]
        },
        formData: {
          email: null,
          secret: null,
          confirmSecret: null,
          serviceToken: null
        },
        isFailedToken: false,
        isFormSubmitted: false
      }
    },
    methods: {
      checkVerifyToken(token) {
        if (!token) this.isFailedToken = !this.isFailedToken;
        else {
          this.$store.dispatch('auth/verifyServiceToken', { token: token })
            .then(response => {
              this.formData.email = response.email;
              this.formData.serviceToken = token;
            })
            .catch(() => this.isFailedToken = !this.isFailedToken)
        }
      },
      submitForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.isFormSubmitted = true;

            this.$store.dispatch(`auth/${ this.$route.params.action }Complete`, this.formData)
              .then(response => {
                this.$message.success(response.message)
                this.$router.push({ name: 'login-page' })
              })
              .catch(error => this.$message.error(error.message))
              .finally(() => this.isFormSubmitted = false);

          } else return false
        })
      }
    },
    created() {
      this.checkVerifyToken(this.$route.query.serviceToken)
    }
  }
</script>
