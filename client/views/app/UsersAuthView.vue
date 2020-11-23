<template>
  <d-container fluid class="main-content-container my-auto h-100">
    <d-row class="no-gutters h-100">
      <d-col tag="div" lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card class="auth-form__card">
          <d-card-body>
            <img :src="require('../../assets/image/share-logo.png')" class="auth-form__logo d-table mx-auto mb-3" alt="Share CV logotype" />
            <h5 v-show="isRouteCorrect" class="auth-form__title text-center mb-4 mt-4"> {{ $t(`app.auth.${ $route.meta.formType }`) }}</h5>
            <transition name="el-zoom-in-center">
              <component :is="authForm" />
            </transition>
          </d-card-body>
        </d-card>
        <div class="auth-form__meta d-flex mt-4">
          <router-link
            v-show="authForm === 'Login'"
            :to="{ name: 'reset-password' }"
            class="auth-form__link"
          >
            {{ $t('app.auth.forgotPass') }}
          </router-link>

          <router-link
            v-show="authForm === 'ResetPassword'"
            :to="{ name: 'auth-login' }"
            class="auth-form__link"
          >
            {{ $t('app.auth.loginLink') }}
          </router-link>
        </div>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
  import AuthLoginForm from '@/components/app/auth/AuthLoginForm';
  import AuthRegisterForm from '@/components/app/auth/AuthRegisterForm';
  import AuthActionForm from '@/components/app/auth/AuthActionForm';

  export default {
    name: 'UsersAuthView',
    components: {
      AuthActionForm, AuthLoginForm, AuthRegisterForm
    },
    data() {
      return {
        isRouteCorrect: true
      }
    },
    computed: {
      authForm() {
        return `Auth${ this.$route.meta.formType }Form`
      }
    },
    created() {
      if (this.$route.name === 'userAction-complete') {
        this.isRouteCorrect = !!this.$route.query.token;
        this.$route.meta.title = this.$route.params.action === 'register' ? 'Завершение регистрации' : 'Восстановление пароля'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auth-form {
    max-width: 350px;

    &__card {
      border-radius: .625rem;
      box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,.1), 0 0.9375rem 1.40625rem rgba(90,97,105,.1), 0 0.25rem 0.53125rem rgba(90,97,105,.12), 0 0.125rem 0.1875rem rgba(90,97,105,.1);

      .card-body {
        overflow: hidden;
        box-shadow: inset 0 4px 0 0 #3ab137;
        border-radius: .625rem;

        .auth-form__logo {
          max-width: 5rem;
        }
      }
    }

    &__meta {
      flex-direction: row;
      justify-content: space-around;

      .auth-form__link {
        font-weight: 400;
        color: #818ea3;

        &:hover {
          color: #3ab137;
          text-decoration: none;
        }
      }
    }
  }
</style>
