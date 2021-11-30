import api from './HttpCreater';

export const validateEmail = async (email,user_type) =>api.post(user_type == 'Customer' ? 'customers/validate_email' : 'providers/validate_email', {email: email});
export const newUser = async (countryCode,phone,login_source,email,auth_token,user_type,name,profile_pic) =>api.post('common/new_user', {login_source:login_source,country_code: countryCode,phone: phone,email:email,auth_token:auth_token,user_type:user_type});
export const validateUser = async (countryCode,phone,type,email,auth_token) =>api.post('common/validate_user', {type:type,country_code: countryCode,phone: phone,email:email,auth_token:auth_token});
export const updateCustomer = async (OS,fcmToken,profile_pic,name,about_me,images,address,gender,age,ethnicity,childrens,emp_status,education,token,refferal_code) =>api.post('customers/update', {OS,fcmToken,profile_pic,name,about_me,images,address,gender,age,ethnicity,childrens,emp_status,education,refferal_code},{ headers: { 'Authorization': 'Bearer '+token }});
export const updateProvider = async (OS,fcmToken,loginSource,profile_pic,name,about_me,images,address,services,availability,events,note,credentials,social_links,gender,age,ethnicity,languages,emp_status,education,token,refferal_code) =>api.post('providers/register', { OS,fcmToken,loginSource,profile_pic,name,about_me,images,address,services,availability,events,email,note,credentials,social_links,gender,age,ethnicity,languages,emp_status,education,token,refferal_code});
export const getServices = async () =>api.post('services/get_all_services', {});
export const getEvents = async () =>api.post('events/get_all_events', {});
export const getTerms = async () =>api.post('common/get_terms_content', {});
export const saveProvider = async (provider_id,token) =>api.post('customers/manage_saved', {provider_id:provider_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const refreshToken = async (type,_id) =>api.post( type ==="Customer" ?'customers/refresh' : "providers/refresh", {type: type,_id: _id});
export const getAllProviders = async (customer_id) =>api.post('customers/get_all_providers', {customer_id:customer_id});
export const getSavedProviders = async (token) =>api.post('customers/get_saved_list', {},{ headers: { 'Authorization': 'Bearer '+token }});
export const getTimeSlots = async (provider_id,selected_date,token) =>api.post('customers/get_available_time_slots', {selected_date:selected_date,provider_id:provider_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const getSavedCards = async (token) =>api.post('customers/list_saved_cards', {},{ headers: { 'Authorization': 'Bearer '+token }});
export const addCard = async (token,cardToken) =>api.post('customers/add_card', {token_id:cardToken},{ headers: { 'Authorization': 'Bearer '+token }});
export const updateCard = async (token,card_id,exp_month,exp_year,name) =>api.post('customers/update_card', {card_id:card_id,exp_month:exp_month,exp_year:exp_year,name:name},{ headers: { 'Authorization': 'Bearer '+token }});
export const contactSupport = async (_id,role,type,message) =>api.post('common/support', {_id:_id,role:role,type:type,message:message});
export const appFeedback = async (_id,role,experience,would_use_again,recommend,feedback) =>api.post('common/app_feedback', {_id:_id,role:role,experience:experience,would_use_again:would_use_again,recommend:recommend,feedback:feedback});
export const deleteCard = async (token,card_id) =>api.post('customers/delete_card', {card_id:card_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const freezeSlot = async (token,provider_id,start_time,end_time) =>api.post('customers/freeze_appointment', {provider_id,start_time,end_time},{ headers: { 'Authorization': 'Bearer '+token }});
export const getFAQ = async () =>api.post('common/get_all_questions', {});
export const getDetails = async (type,customer_id,provider_id,token) =>api.post( type === "Customer" ?'customers/get_provider_detail' : "providers/get_customer_data", {customer_id: customer_id,provider_id: provider_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const getProviderDetail = async (token) =>api.post( "providers/get", {},{ headers: { 'Authorization': 'Bearer '+token }});
export const getUpdos = async (type,token) =>api.post( type === "Customer" ?'customers/get_my_appointments' : "providers/get_my_appointments", {},{ headers: { 'Authorization': 'Bearer '+token }});
export const sendPropsal = async (token,appointment_id,start_time,end_time,services_data,customer_id,additional_charges,total,description,note) =>api.post( "providers/create_proposal", {appointment_id,start_time,end_time,services_data,customer_id,additional_charges,total,description,note},{ headers: { 'Authorization': 'Bearer '+token }});
export const updatePropsal = async (token,appointment_id,start_time,end_time,services_data,customer_id,additional_charges,total,description,note,proposal_id) =>api.post( "providers/update_proposal", {appointment_id,start_time,end_time,services_data,customer_id,additional_charges,total,description,note,proposal_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const cancelAppointment = async (token,appointment_id) =>api.post( "customers/cancel_appointment", {appointment_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const getSchedule = async (selected_date,token) =>api.post('providers/get_my_schedule', {selected_date:selected_date},{ headers: { 'Authorization': 'Bearer '+token }});
export const getAppointmentDetail = async (appointment_id) =>api.post('common/get_appointment_detail', {appointment_id});
export const respondProposal = async (token,proposal_id,action) =>api.post('customers/respond_to_proposal', {proposal_id,action},{ headers: { 'Authorization': 'Bearer '+token }});
export const completeAppointment= async (token,appointment_id) =>api.post('providers/complete_appointment', {appointment_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const generatePaymentIntent= async (token,appointment_id,tip) =>api.post('customers/generate_payment_intent', {appointment_id,tip},{ headers: { 'Authorization': 'Bearer '+token }});
export const reviewAppointment= async (token,provider_id,appointment_id,experience,would_use_again,recommend,feedback,rating) =>api.post('customers/appointment_review', {provider_id,appointment_id,experience,would_use_again,recommend,feedback,rating},{ headers: { 'Authorization': 'Bearer '+token }});
export const completePayment= async (token,appointment_id) =>api.post('customers/complete_payment', {appointment_id},{ headers: { 'Authorization': 'Bearer '+token }});
export const getUserReviews= async (token) =>api.post('customers/get_my_reviews', {},{ headers: { 'Authorization': 'Bearer '+token }});
export const getTransactionList= async (token) =>api.post('providers/get_my_transactions', {},{ headers: { 'Authorization': 'Bearer '+token }});
export const socialLogin = async (login_source,fcm_token,os,email,auth_token) =>api.post( type ==="Customer" ?'customers/social_login' : "providers/social_login", {login_source,fcm_token,os,email,auth_token});


export const validURL = (str) =>{
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export const uploadImage = async (pathToImageOnFilesystem,isCustomer) => {
  let paramName = ""
  let endPoint = ""
  isCustomer ? paramName ="customer_image":paramName="provider_image"
  isCustomer ? endPoint ="customers/upload_image":endPoint="providers/upload_images"
    const form = new FormData()
    form.append(paramName, {
      name: Date.now()+'omgitsme.jpg',
      uri: pathToImageOnFilesystem,
      type: 'image/jpg'
    })
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    return api.post(endPoint, form, { headers })
  }
