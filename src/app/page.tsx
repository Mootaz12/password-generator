"use client";
import { ArrowRightOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Checkbox, message, Slider } from "antd";
import { useState } from "react";

type Options = {
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeLowercase: boolean;
};

export default function Home() {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [numberOfConstraint, setNumberOfConstraint] = useState<number>(1);
  const [uppercaseChecked, setUppercaseChecked] = useState<boolean>(true);
  const [lowercaseChecked, setLowercaseChecked] = useState<boolean>(false);
  const [numbersChecked, setNumbersChecked] = useState<boolean>(false);
  const [symbolsChecked, setSymbolsChecked] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>({
    includeUppercase: true,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
  });
  const [password, setPassword] = useState<string>("");

  const handleCopy = () => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          message.success("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          message.error("Failed to copy text");
        });
    }
  };

  const getPasswordStrength = (numberOfConstraint: number) => {
    switch (numberOfConstraint) {
      case 1:
        return "very weak";
      case 2:
        return "weak";
      case 3:
        return "medium";
      case 4:
        return "strong";
      default:
        return "very weak";
    }
  };

  const generatePassword = (length: number, options: Options) => {
    const {
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    } = options;

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = "";

    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += specialChars;

    if (characters.length === 0) return "";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setPassword(password);
  };

  const handleCheckboxChange = (setter: any, checked: boolean) => {
    setter((checked: any) => {
      const newChecked = !checked;
      setNumberOfConstraint((prevCount) =>
        newChecked ? prevCount + 1 : prevCount - 1
      );
      return newChecked;
    });
  };

  const handleGeneratePassword = () => {
    const newOptions = {
      includeUppercase: uppercaseChecked,
      includeLowercase: lowercaseChecked,
      includeNumbers: numbersChecked,
      includeSymbols: symbolsChecked,
    };
    setOptions(newOptions);
    generatePassword(passwordLength, newOptions);
  };

  return (
    <main className="flex flex-col gap-3 font-mono w-96 ">
      <h2 className="font-semibold text-[#807e8d] text-2xl text-center">
        Password Generator
      </h2>
      {password.length > 0 && (
        <div className="p-4 bg-[#24232b] flex-row flex justify-between">
          <p className="text-[#525159] text-xl">{password}</p>
          <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </div>
      )}
      <div className="flex flex-col gap-2 bg-[#24232b] p-4">
        <div className="flex flex-row justify-between text-xl">
          <p className="text-white">Character Length</p>
          <p className="text-[#91d09e]">{passwordLength}</p>
        </div>
        <Slider
          tooltip={{ open: false }}
          min={6}
          max={20}
          defaultValue={8}
          keyboard={true}
          onChange={(value) => setPasswordLength(value)}
        />
        <Checkbox
          defaultChecked
          style={{ color: "white" }}
          onChange={() =>
            handleCheckboxChange(setUppercaseChecked, uppercaseChecked)
          }
        >
          Include Uppercase Letters
        </Checkbox>
        <Checkbox
          style={{ color: "white" }}
          onChange={() =>
            handleCheckboxChange(setLowercaseChecked, lowercaseChecked)
          }
        >
          Include Lowercase Letters
        </Checkbox>
        <Checkbox
          style={{ color: "white" }}
          onChange={() =>
            handleCheckboxChange(setNumbersChecked, numbersChecked)
          }
        >
          Include Numbers
        </Checkbox>
        <Checkbox
          style={{ color: "white" }}
          onChange={() =>
            handleCheckboxChange(setSymbolsChecked, symbolsChecked)
          }
        >
          Include Symbols
        </Checkbox>
      </div>
      <div className="bg-[#18171f] flex flex-row items-center py-4 px-6 justify-between">
        <p className="text-[#525159] font-semibold">STRENGTH</p>
        <div className="flex flex-row justify-evenly gap-3 items-center">
          <p className="text-white font-semibold">
            {getPasswordStrength(numberOfConstraint)}
          </p>
          <div
            className={`outline outline-1 outline-white px-1 py-4 ${
              uppercaseChecked ? "bg-[#f8cd62] outline-[#f8cd62]" : ""
            }`}
          ></div>
          <div
            className={`outline outline-1 outline-white px-1 py-4 ${
              lowercaseChecked ? "bg-[#f8cd62] outline-[#f8cd62]" : ""
            }`}
          ></div>
          <div
            className={`outline outline-1 outline-white px-1 py-4 ${
              numbersChecked ? "bg-[#f8cd62] outline-[#f8cd62]" : ""
            }`}
          ></div>
          <div
            className={`outline outline-1 outline-white px-1 py-4 ${
              symbolsChecked ? "bg-[#f8cd62] outline-[#f8cd62]" : ""
            }`}
          ></div>
        </div>
      </div>
      <button
        onClick={handleGeneratePassword}
        type="submit"
        className="px-10 py-3 text-xl text-[#0f2b1e] bg-[#a4ffaf] outline-none hover:text-[#a4ffaf] hover:outline-2 hover:outline-[#a4ffaf] hover:bg-[#18171f]"
      >
        GENERATE <ArrowRightOutlined />
      </button>
    </main>
  );
}
