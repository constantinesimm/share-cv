<template>
  <d-container fluid>
    <d-row>
      <d-col tag="main" class="main-content p-0" sm="12" md="12" lg="12">

        <slot />

      </d-col>
    </d-row>
  </d-container>
</template>

<script>
  export default {
    name: 'PublicCvLayout'
  }
</script>
