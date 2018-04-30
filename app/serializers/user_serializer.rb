class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :city_name, :email, :role, :token
end
