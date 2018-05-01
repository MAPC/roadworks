require 'test_helper'

class PermitsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @permit = permits(:one)
  end

  test "should get index" do
    get permits_url
    assert_response :success
  end

  test "should get new" do
    get new_permit_url
    assert_response :success
  end

  test "should create permit" do
    assert_difference('Permit.count') do
      post permits_url, params: { permit: { address: @permit.address, applicant_name: @permit.applicant_name, end_date: @permit.end_date, payload: @permit.payload, start_date: @permit.start_date, permit_type: @permit.permit_type } }
    end

    assert_redirected_to permit_url(Permit.last)
  end

  test "should show permit" do
    get permit_url(@permit)
    assert_response :success
  end

  test "should get edit" do
    get edit_permit_url(@permit)
    assert_response :success
  end

  test "should update permit" do
    patch permit_url(@permit), params: { permit: { address: @permit.address, applicant_name: @permit.applicant_name, end_date: @permit.end_date, payload: @permit.payload, start_date: @permit.start_date, permit_type: @permit.permit_type } }
    assert_redirected_to permit_url(@permit)
  end

  test "should destroy permit" do
    assert_difference('Permit.count', -1) do
      delete permit_url(@permit)
    end

    assert_redirected_to permits_url
  end
end
