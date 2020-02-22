import React from "react";
import "./App.css";

function CreateReview() {
  return (
    <div>
      <form
        role="form"
        action="/signup"
        accept-charset="UTF-8"
        method="post"
        class="signup-form"
      >
        <fieldset>
          <legend>Create an account</legend>

          <div>
            <label for="user-email">Email</label>
            <input
              type="email"
              placeholder="foo@bar.com"
              name="user-email"
              id="user-email"
              required
            />
          </div>

          <div>
            <label for="user-password">Password</label>
            <input
              placeholder="1234passw0rd"
              type="password"
              name="user-password"
              id="user-password"
              required
            />
          </div>

          <button type="submit">Sign up</button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateReview;
