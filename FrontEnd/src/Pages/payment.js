import React from "react";

export default function Payment(){
    return(
        <div class="row wrapper">
<div class="col-10 col-lg-5">
    <form class="shadow-lg">
        <h1 class="mb-4">Card Info</h1>
        <div class="form-group">
          <label for="card_num_field">Card Number</label>
          <input
            type="text"
            id="card_num_field"
            class="form-control"
            value=""
          />
        </div>
        
        <div class="form-group">
          <label for="card_exp_field">Card Expiry</label>
          <input
            type="text"
            id="card_exp_field"
            class="form-control"
            value=""
          />
        </div>
        
        <div class="form-group">
          <label for="card_cvc_field">Card CVC</label>
          <input
            type="text"
            id="card_cvc_field"
            class="form-control"
            value=""
          />
        </div>

    
        <button
          id="pay_btn"
          type="submit"
          class="btn btn-block py-3"
        >
          Pay
        </button>

      </form>
      </div>
</div>
    )
}