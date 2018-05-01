# == Schema Information
#
# Table name: raw_segments
#
#  gid        :integer          not null, primary key
#  classifica :integer
#  admin_type :integer
#  street_nam :string(80)
#  rt_number  :string(4)
#  altrtnum1  :string(4)
#  altrtnum2  :string(4)
#  altrtnum3  :string(4)
#  altrtnum4  :string(4)
#  altrt1type :integer
#  rdtype     :integer
#  mgis_town  :string(25)
#  roadinvent :decimal(10, )
#  crn        :string(9)
#  roadsegmen :decimal(10, )
#  frommeasur :decimal(, )
#  tomeasure  :decimal(, )
#  assignedle :decimal(, )
#  assigned_1 :integer
#  streetlist :decimal(10, )
#  streetname :string(75)
#  city       :integer
#  county     :string(1)
#  municipals :integer
#  fromendtyp :integer
#  fromstreet :string(75)
#  fromcity   :integer
#  fromstate  :integer
#  toendtype  :integer
#  tostreetna :string(75)
#  tocity     :integer
#  tostate    :integer
#  mileagecou :integer
#  routekey   :string(20)
#  routefrom  :decimal(, )
#  routeto    :decimal(, )
#  equationro :decimal(, )
#  equation_1 :decimal(, )
#  routesyste :string(2)
#  routenumbe :string(10)
#  subroute   :string(10)
#  routedirec :string(2)
#  routetype  :integer
#  routequali :integer
#  rpa        :string(20)
#  mpo        :string(35)
#  massdothig :integer
#  urbantype  :integer
#  urbanizeda :string(5)
#  functional :integer
#  federalfun :integer
#  jurisdicti :string(1)
#  truckroute :integer
#  nhsstatus  :integer
#  federalaid :string(10)
#  facilityty :integer
#  streetoper :integer
#  accesscont :integer
#  tollroad   :integer
#  numberofpe :integer
#  rightsidew :integer
#  rightshoul :integer
#  rightsho_1 :integer
#  mediantype :integer
#  medianwidt :integer
#  leftsidewa :integer
#  leftshould :integer
#  undividedl :integer
#  undivide_1 :integer
#  leftshou_1 :integer
#  surfacetyp :integer
#  surfacewid :integer
#  rightofway :integer
#  numberoftr :integer
#  oppositenu :integer
#  curbs      :integer
#  terrain    :integer
#  speedlimit :integer
#  opposingdi :integer
#  structural :integer
#  adt        :decimal(10, )
#  adtstation :decimal(10, )
#  adtderivat :integer
#  adtyear    :integer
#  iri        :integer
#  iriyear    :integer
#  iristatus  :integer
#  psi        :decimal(, )
#  psiyear    :integer
#  hpmscode   :integer
#  hpmssample :string(50)
#  addedroadt :integer
#  dateactive :date
#  lifecycles :integer
#  item_id    :decimal(10, )
#  shape_len  :decimal(, )
#  geom       :geometry({:srid= multilinestring, 4326
#

class RawSegment < ApplicationRecord
  self.primary_key = "gid"
  alias_attribute :street_name, :street_nam
  alias_attribute :geometry, :geom
end
