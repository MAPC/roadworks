Rails.application.config.session_store :cookie_store, key: '_my_app_session', httponly: false, secure: Rails.env.production?
