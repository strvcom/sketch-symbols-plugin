class CreateSymbolState {
  constructor() {
    if (!CreateSymbolState.instance) {
      this.symbolCreatedSwitch = false
      CreateSymbolState.instance = this
    }

    return CreateSymbolState.instance
  }

  setSymbolCreatedTrue() {
    this.symbolCreatedSwitch = true
  }

  setSymbolCreatedFalse() {
    this.symbolCreatedSwitch = false
  }

  getSymbolCreatedSwitch() {
    return this.symbolCreatedSwitch
  }
}

export default CreateSymbolState
