import Header from "../components/Header";

export default function LoginPage() {
  return (
    <>  
      <Header
        heading="Welcome back"
        paragraph="New here? "
        linkName="Sign up"
        linkUrl="/signup"
      />
    </>
  );
}