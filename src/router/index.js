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
import PartThree from "../pages/admin/PartThree/PartThree";
import CreatePartThree from "../pages/admin/PartThree/CreatePartThree";
import CreateQuestionPartThree from "../pages/admin/PartThree/CreateQuestionPartThree";
import PartFour from "../pages/admin/PartFour/PartFour";
import CreatePartFour from "../pages/admin/PartFour/CreatePartFour";
import CreateQuestionPartFour from "../pages/admin/PartFour/CreateQuestionPartFour";
import PartFive from "../pages/admin/PartFive/PartFive";
import CreatePartFive from "../pages/admin/PartFive/CreatePartFive";
import CreateQuestionPartFive from "../pages/admin/PartFive/CreateQuestionPartFive";
import PartSix from "../pages/admin/PartSix/PartSix";
import CreatePartSix from "../pages/admin/PartSix/CreatePartSix";
import CreateQuestionPartSix from "../pages/admin/PartSix/CreateQuestionPartSix";
import PartSeven from "../pages/admin/PartSeven/PartSeven";
import CreatePartSeven from "../pages/admin/PartSeven/CreatePartSeven";
import CreateQuestionPartSeven from "../pages/admin/PartSeven/CreateQuestionPartSeven";
import ListQuestionToeic from "../pages/admin/Exam/ListQuestionToeic";
import DetailPartOne from "../pages/admin/PartOne/DetailPartOne";
import DetailPartTwo from "../pages/admin/PartTwo/DetailPartTwo";
import DetailPartThree from "../pages/admin/PartThree/DetailPartThree";
import DetailPartFour from "../pages/admin/PartFour/DetailPartFour";
import DetailPartFive from "../pages/admin/PartFive/DetailPartFive";
import DetailPartSix from "../pages/admin/PartSix/DetailPartSix";
import DetailPartSeven from "../pages/admin/PartSeven/DetailPartSeven";
import Part1 from "../pages/client/Part1/Part1";
import QuestionPart1 from "../pages/client/Part1/QuestionPart1";
import Result from "../pages/client/ResultPart/Result";
import Part2 from "../pages/client/Part2/Part2";
import QuestionPart2 from "../pages/client/Part2/QuestionPart2";
import Part3 from "../pages/client/Part3/Part3";
import QuestionPart3 from "../pages/client/Part3/QuestionPart3";
import Part4 from "../pages/client/Part4/Part4";
import QuestionPart4 from "../pages/client/Part4/QuestionPart4";
import Part5 from "../pages/client/Part5/Part5";
import QuestionPart5 from "../pages/client/Part5/QuestionPart5";
import Part6 from "../pages/client/Part6/Part6";
import QuestionPart6 from "../pages/client/Part6/QuestionPart6";


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
      },
      {
        path: "practice/part-one",
        element: <Part1 />
      },
      {
        path: "practice/part-one/:id",
        element: <QuestionPart1 />
      },
      {
        path: "practice/part-two",
        element: <Part2 />
      },
      {
        path: "practice/part-two/:id",
        element: <QuestionPart2 />
      },
      {
        path: "practice/part-three",
        element: <Part3 />
      },
      {
        path: "practice/part-three/:id",
        element: <QuestionPart3 />
      },
      {
        path: "practice/part-four",
        element: <Part4 />
      },
      {
        path: "practice/part-four/:id",
        element: <QuestionPart4 />
      },
      {
        path: "practice/part-five",
        element: <Part5 />
      },
      {
        path: "practice/part-five/:id",
        element: <QuestionPart5 />
      },
      {
        path: "practice/part-six",
        element: <Part6 />
      },
      {
        path: "practice/part-six/:id",
        element: <QuestionPart6 />
      },
      {
        path: "practice/result/:id",
        element: <Result />
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
        path: "exam/detail/:id",
        element: <ListQuestionToeic />
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
        path: "part-1/detail/:id",
        element: <DetailPartOne />
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
      },
      {
        path: "part-2/detail/:id",
        element: <DetailPartTwo />
      },
      {
        path: "part-3",
        element: <PartThree />
      },
      {
        path: "part-3/create-part3",
        element: <CreatePartThree />
      },
      {
        path: "part-3/create-question/:id",
        element: <CreateQuestionPartThree />
      },
      {
        path: "part-3/detail/:id",
        element: <DetailPartThree />
      },
      {
        path: "part-4",
        element: <PartFour />
      },
      {
        path: "part-4/create-part4",
        element: <CreatePartFour />
      },
      {
        path: "part-4/create-question/:id",
        element: <CreateQuestionPartFour />
      },
      {
        path: "part-4/detail/:id",
        element: <DetailPartFour />
      },
      {
        path: "part-5",
        element: <PartFive />
      },
      {
        path: "part-5/create-part5",
        element: <CreatePartFive />
      },
      {
        path: "part-5/create-question/:id",
        element: <CreateQuestionPartFive />
      },
      {
        path: "part-5/detail/:id",
        element: <DetailPartFive />
      },
      {
        path: "part-6",
        element: <PartSix />
      },
      {
        path: 'part-6/create-part6',
        element: <CreatePartSix />
      },
      {
        path: 'part-6/create-question/:id',
        element: <CreateQuestionPartSix />
      },
      {
        path: "part-6/detail/:id",
        element: <DetailPartSix />
      },
      {
        path: "part-7",
        element: <PartSeven />
      },
      {
        path: 'part-7/create-part7',
        element: <CreatePartSeven />
      },
      {
        path: 'part-7/create-question/:id',
        element: <CreateQuestionPartSeven />
      },
      {
        path: "part-7/detail/:id",
        element: <DetailPartSeven />
      },
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