class AppActions {
    Constants = {
        ShowLoader: 'app/loader/show',
        HideLoader: 'app/loader/hide',
        ResetStore: 'app/store/reset',
        selected_book:'app/store/selected_book',
        cart_data:'cart_data',
    };

    // constants here (Action Constants are always PascalCase)
    showLoader = () => ({
        type: this.Constants.ShowLoader
    })
    hideLoader = () => ({
        type: this.Constants.HideLoader
    })
    resetStore = () => ({
        type: this.Constants.ResetStore
    })
    selectedBook= (data: any) => {
        return {
            type: this.Constants.selected_book,
            payload: data
      }
    }
    
    cartData = (data: any) => {
        return {
              type: this.Constants.cart_data,
              payload: data
        }
  }

}

export let app_actions = new AppActions();
