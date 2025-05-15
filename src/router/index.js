import LayoutAdmin from "../layout/admin/LayoutAdmin";
import LayoutClient from "../layout/client/LayoutClient";
import ForgotPassword from "../pages/client/ForgotPassword/ForgotPassword";
import Permissions from "../pages/admin/Permissions/Permissions";
import CreateRole from "../pages/admin/Role/CreateRole";
import Role from "../pages/admin/Role/Role";
import UpdateRole from "../pages/admin/Role/UpdateRole";
import SignIn from "../pages/admin/SignIn/SignIn";
import CreateAccount from "../pages/admin/User/CreateAccount";
import UpdateAccount from "../pages/admin/User/UpdateAccount";
import User from "../pages/admin/User/User";
import CategoryVocabulary from "../pages/admin/Vocabulary/CategoryVocabulary";
import CreateVocabulary from "../pages/admin/Vocabulary/CreateVocabulary";
import TitleVocabulary from "../pages/admin/Vocabulary/TitleVocabulary";
import Vocabulary from "../pages/admin/Vocabulary/Vocabulary";
import Home from "../pages/client/Home/Home";
import LearnWriting from "../pages/client/LearnWritting/LearnWriting";
import Login from "../pages/client/Login/Login";
import Register from "../pages/client/Register/Register";
import CodeID from "../pages/client/CodeID/CodeID";
import ChangePassword from "../pages/client/ChangePassword/ChangePassword";
import Grammar from "../pages/admin/Grammar/Grammar";
import CreateGrammar from "../pages/admin/Grammar/CreateGrammar";
import DetailGrammar from "../pages/admin/Grammar/DetailGrammar";
import UpdateGrammar from "../pages/admin/Grammar/UpdateGrammar";
import Practice from "../pages/client/Practice/Practice";
import Theory from "../pages/client/Theory/Theory";
import Vocab from "../pages/client/Vocab/Vocab";
import CategoryVocab from "../pages/client/Vocab/CategoryVocab";
import ContentVocab from "../pages/client/Vocab/ContentVocab";
import Grammars from "../pages/client/Gramars/Grammars";
import GrammarsDetail from "../pages/client/Gramars/GrammarsDetail";
import LearnSpeaking from "../pages/client/LearnSpeaking/LearnSpeaking";
import Test from "../pages/client/Test/Test";
import FlashCard from "../pages/client/Test/FlashCard";
import Define from "../pages/client/Test/Define";
import ConnectCard from "../pages/client/Test/ConnectCard";
import UnAuthor from "../pages/admin/UnAuthor/UnAuthor";
import NotFound from "../pages/client/NotFound/NotFound";
import Exam from "../pages/admin/Exam/Exam";
import CreateExam from "../pages/admin/Exam/CreateExam";
import CreateQuestion from "../pages/admin/Exam/CreateQuestion";
import Toeic from "../pages/client/Toeic/Toeic";
import ToeicTest from "../pages/client/Toeic/ToeicTest";
import ToeicResult from "../pages/client/Toeic/ToeicResult";
import UploadDoc from "../pages/admin/Doc/UploadDoc";
import Doc from "../pages/admin/Doc/Doc";
import DetailDoc from "../pages/admin/Doc/DetailDoc";
import Document from "../pages/client/Document/Document";
import AboutUs from "../pages/admin/AboutUs/AboutUs";
import About from "../pages/client/About/About";
import ToeicExam from "../pages/client/Toeic/ToeicExam";
import Profile from "../pages/client/Profile/Profile";
import VocabSaved from "../pages/client/VocabSaved/VocabSaved";
import PartOne from "../pages/admin/PartOne/PartOne";
import CreatePartOne from "../pages/admin/PartOne/CreatePartOne";
import CreateQuestionPartOne from "../pages/admin/PartOne/CreateQuestionPartOne";
import PartTwo from "../pages/admin/PartTwo/PartTwo";
import CreatePartTwo from "../pages/admin/PartTwo/CreatePartTwo";
import CreateQuestionPartTwo from "../pages/admin/PartTwo/CreateQuestionPartTwo";


export const router = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "practice/learn-writing",
        element: <LearnWriting />
      },
      {
        path: "auth/login",
        element: <Login />
      },
      {
        path: "auth/register",
        element: <Register />
      },
      {
        path: "auth/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "auth/code-id/:id",
        element: <CodeID />
      },
      {
        path: "auth/change-password",
        element: <ChangePassword />
      },
      {
        path: 'practice',
        element: <Practice />
      },
      {
        path: "practice/ly-thuyet",
        element: <Theory />
      },
      {
        path: "practice/ly-thuyet/vocabulary",
        element: <Vocab />
      },
      {
        path: "practice/ly-thuyet/vocabulary/:slug",
        element: <CategoryVocab />
      },
      {
        path: "practice/ly-thuyet/vocabulary/:slug/:title",
        element: <ContentVocab />
      },
      {
        path: "practice/ly-thuyet/vocabulary/:slug/on-tap/:title",
        element: <Test />
      },
      {
        path: "practice/ly-thuyet/vocabulary/:slug/on-tap/:title/flashcard",
        element: <FlashCard />
      },
      {
        path: "practice/ly-thuyet/vocabulary/:slug/on-tap/:title/define",
        element: <Define />
      },
      {
        path: "practice/ly-thuyet/vocabulary/:slug/on-tap/:title/connect",
        element: <ConnectCard />
      },
      {
        path: "practice/ly-thuyet/grammar",
        element: <Grammars />
      },
      {
        path: "practice/ly-thuyet/grammar/:slug",
        element: <GrammarsDetail />
      },
      {
        path: "practice/speaking",
        element: <LearnSpeaking />
      },
      {
        path: "practice/toeic",
        element: <Toeic />
      },
      {
        path: "practice/toeic/exam/:id",
        element: <ToeicExam />
      },
      {
        path: "practice/toeic/:id",
        element: <ToeicTest />
      },
      {
        path: "practice/toeic/result/:id",
        element: <ToeicResult />
      },
      {
        path: "documents",
        element: <Document />
      },
      {
        path: "aboutus",
        element: <About />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: "vocab-save",
        element: <VocabSaved />
      }
    ]
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: 'user',
        element: <User />
      },
      {
        path: "vocabulary",
        element: <Vocabulary />
      },
      {
        path: "user/create-account",
        element: <CreateAccount />
      },
      {
        path: "user/update-account/:id",
        element: <UpdateAccount />
      },
      {
        path: "role",
        element: <Role />
      },
      {
        path: "role/create-role",
        element: <CreateRole />
      },
      {
        path: "role/update-role/:id",
        element: <UpdateRole />
      },
      {
        path: "permissions",
        element: <Permissions />
      },
      {
        path: "vocabulary/create-vocabulary",
        element: <CreateVocabulary />
      },
      {
        path: "vocabulary/:slug",
        element: <TitleVocabulary />
      },
      {
        path: "vocabulary/:slug/:title",
        element: <CategoryVocabulary />
      },
      {
        path: "grammar",
        element: <Grammar />
      },
      {
        path: "grammar/create-grammar",
        element: <CreateGrammar />
      },
      {
        path: "grammar/:slug",
        element: <DetailGrammar />
      },
      {
        path: "grammar/update-grammar/:slug",
        element: <UpdateGrammar />
      },
      {
        path: 'exam',
        element: <Exam />
      },
      {
        path: 'exam/create-exam',
        element: <CreateExam />
      },
      {
        path: "exam/create-question/:id",
        element: <CreateQuestion />
      },
      {
        path: 'doc',
        element: <Doc />
      },
      {
        path: 'doc/upload',
        element: <UploadDoc />
      },
      {
        path: "doc/detail/:id",
        element: <DetailDoc />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path: "part-1",
        element: <PartOne />
      },
      {
        path: "part-1/create-part1",
        element: <CreatePartOne />
      },
      {
        path: "part-1/create-question/:id",
        element: <CreateQuestionPartOne />
      },
      {
        path: "part-2",
        element: <PartTwo />
      },
      {
        path: "part-2/create-part2",
        element: <CreatePartTwo />
      },
      {
        path: "part-2/create-question/:id",
        element: <CreateQuestionPartTwo />
      }
    ]
  },
  {
    path: 'admin/sign-in',
    element: <SignIn />
  },
  {
    path: 'admin/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: "unauthorized",
    element: <UnAuthor />
  },
  {
    path: '*',
    element: <NotFound />
  },
]