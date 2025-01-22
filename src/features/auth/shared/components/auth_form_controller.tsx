import { MouseEventHandler, useState } from "react";

export class AuthFormController {
  //   showPassword: string;
  //   name: string;
  //   email: string;
  //   password: string;

  //   setShowPassword: (value: string) => void;
  //   setName: (value: string) => void;
  //   setEmail: (value: string) => void;
  //   setPassword: (value: string) => void;

  private static instance: AuthFormController;

  private constructor() {
    // const [showPassword, setShowPassword] = useState("password");
    // const [name, setName] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    // this.showPassword = showPassword;
    // this.name = name;
    // this.email = email;
    // this.password = password;
    // this.setShowPassword = setShowPassword;
    // this.setName = setName;
    // this.setEmail = setEmail;
    // this.setPassword = setPassword;
  }

  //   static getInstance(): AuthFormController {
  //     if (!AuthFormController.instance) {
  //       AuthFormController.instance = new AuthFormController();
  //     }
  //     return AuthFormController.instance;
  //   }

  //   handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
  //     this.setName(e.target.value);
  //   }

  //   handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
  //     this.setEmail(e.target.value);
  //   }

  //   handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
  //     this.setPassword(e.target.value);
  //   }

  //   handleShowPassword() {
  //     this.setShowPassword(this.showPassword === "text" ? "password" : "text");
  //   }
}
