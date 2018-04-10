class Permit < ApplicationRecord
  enum kind: [ :street_opening, :trench ]
end
