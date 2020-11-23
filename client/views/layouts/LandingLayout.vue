<template>
  <d-container fluid>
    <d-row class="h-100">
      <d-col class="h-100 p-0" sm="12" md="12" lg="12">

        <main role="main" class="main-content">
          <slot />
        </main>

      </d-col>
    </d-row>
  </d-container>
</template>

<script>
  export default {
    name: 'LandingLayout'
  }
</script>

<style lang="scss" scoped>
  .main-content {
    height: inherit;
  }
</style>
