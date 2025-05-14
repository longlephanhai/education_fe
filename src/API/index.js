export const url_backend = process.env.REACT_APP_URL_DOMAIN

const Summary = {
  signIn: {
    url: `${url_backend}/auth/login`,
  },
  signUp: {
    url: `${url_backend}/auth/register`,
  },
  createRole: {
    url: `${url_backend}/roles`,
  },
  getRoles: {
    url: `${url_backend}/roles`,
  },
  getRolesById: {
    url: `${url_backend}/roles/`,
  },
  deleteRole: {
    url: `${url_backend}/roles/`,
  },
  updateRole: {
    url: `${url_backend}/roles/`,
  },
  addPermission: {
    url: `${url_backend}/roles/permission`
  },
  getAllAccounts: {
    url: `${url_backend}/users`
  },
  getAccounts: {
    url: `${url_backend}/users/`
  },
  updateAccount: {
    url: `${url_backend}/users/`
  },
  deleteAccount: {
    url: `${url_backend}/users/`
  },
  createVocabulary: {
    url: `${url_backend}/vocabulary`
  },
  getTitles: {
    url: `${url_backend}/vocabulary/titles`
  },
  getSlugs: {
    url: `${url_backend}/vocabulary/`
  },
  getCategory: {
    url: `${url_backend}/vocabulary/`
  },
  checkCode: {
    url: `${url_backend}/auth/check-code`
  },
  retryActive: {
    url: `${url_backend}/auth/retry-active`
  },
  retryPassword: {
    url: `${url_backend}/auth/retry-password`
  },
  changePassword: {
    url: `${url_backend}/auth/change-password`
  },
  createGrammar: {
    url: `${url_backend}/grammars`
  },
  findAllGrammar: {
    url: `${url_backend}/grammars`
  },
  findGrammarBySlug: {
    url: `${url_backend}/grammars/`
  },
  deleteGrammar: {
    url: `${url_backend}/grammars/`
  },
  updateGrammar: {
    url: `${url_backend}/grammars/`
  },
  gemini: {
    url: `${url_backend}/gemini/prompt`
  },
  addFavourite: {
    url: `${url_backend}/favourite`
  },
  getFavourite: {
    url: `${url_backend}/favourite`
  },
  cancelFavourite: {
    url: `${url_backend}/favourite`
  },
  chatGpt: {
    url: `${url_backend}/chat`
  },
  getRandowmVocabulary: {
    url: `${url_backend}/vocabulary/randomized`
  },
  getRandowmQuestion: {
    url: `${url_backend}/vocabulary/random`
  },
  getRoleAdmin: {
    url: `${url_backend}/auth/role`
  },
  createExam: {
    url: `${url_backend}/exam`
  },
  getExam: {
    url: `${url_backend}/exam`
  },
  getExamTitle: {
    url: `${url_backend}/exam/`
  },
  getExamById: {
    url: `${url_backend}/question/`
  },
  createQuestion: {
    url: `${url_backend}/question`
  },
  getProfile: {
    url: `${url_backend}/auth/profile`
  },
  loginGoogle: {
    url: `${url_backend}/auth/google-redirect`
  },
  randomTopic: {
    url: `${url_backend}/gemini/title`
  },
  uploadDoc:{
    url: `${url_backend}/doc`
  },
  getDoc:{
    url: `${url_backend}/doc`
  },
  deleteDoc:{
    url: `${url_backend}/doc/`
  },
  detailDoc:{
    url: `${url_backend}/doc/`
  },
  aboutUs:{
    url: `${url_backend}/aboutus`
  },
  getAboutUs:{
    url: `${url_backend}/aboutus`
  },
  postPartOne:{
    url: `${url_backend}/partone`
  }
}
export default Summary;