import Loading from "@/components/widget/loading-spinner";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { useUser } from "@supabase/auth-helpers-react";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const UpdateProfile = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState("icons8-person-96_1_lqo4dx.png");
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>(
    user ? (user.user_metadata.name as string).replace(" ", "") : ""
  );
  const [avatar, setAvatar] = useState<string>(
    `${process.env.NEXT_PUBLIC_AVATAR_PROFILE as string}${filename}`
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const getProfile = async () => {
    try {
      let { data, error } = await supabaseClient
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user?.id as string)
        .single();

      if (error) {
        console.warn(error);
      } else if (data && data.avatar_url !== null && data?.avatar_url !== "") {
        setAvatar(
          `${process.env.NEXT_PUBLIC_AVATAR_PROFILE as string}${
            data.avatar_url
          }`
        );
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (user) getProfile();
    console.log(avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setAvatar(URL.createObjectURL(selectedFile as Blob));
    setFile(selectedFile);
  };

  const handleClick = () => {
    // open file input box on click of another element
    if (inputRef.current) {
      inputRef.current?.click();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data: sessionData } = await supabaseClient.auth.getSession();
    if (file && sessionData.session) {
      const fileExt = file.name.split(".").pop();
      const profileFilename = `${uuidv4()}-${(
        user?.user_metadata.name as string
      )
        .replace(" ", "-")
        .toLowerCase()}.${fileExt}`;

      const { data, error } = await supabaseClient.storage
        .from("avatars")
        .upload(profileFilename, file);

      if (data && !error) {
        const filepath = data.path;
        const updates = {
          id: user?.id as string,
          username: (user?.user_metadata.name as string).replace(" ", ""),
          full_name: user?.user_metadata.name as string,
          website: "",
          avatar_url: filepath,
          updated_at: new Date(),
        };

        console.log(updates);

        await supabaseClient.from("profiles").upsert([updates] as never[]);

        setFilename(
          `${process.env.NEXT_PUBLIC_AVATAR_PROFILE as string}${filepath}`
        );
        setIsLoading(false);
      } else {
        console.log(error.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: (user?.user_metadata.name as string).split(" ")[0],
      last_name: (user?.user_metadata.name as string).split(" ")[1],
      username: username,
      email: user?.email as string,
    },
    onSubmit: handleSubmit,
  });
  return (
    <form className="md:col-span-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full flex items-center gap-x-8">
          <Image
            src={avatar}
            alt=""
            className="h-24 w-24 flex-none rounded-lg border-2 bg-white object-cover"
            height={97}
            width={97}
          />
          <div>
            <input
              type="file"
              name="image"
              ref={inputRef}
              className="hidden"
              onChange={handleFileSelected}
            />
            <button
              type="button"
              onClick={handleClick}
              className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white/20"
            >
              Change avatar
            </button>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...formik.getFieldProps("first_name")}
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...formik.getFieldProps("last_name")}
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...formik.getFieldProps("email")}
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md  ring-1 ring-inset  focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-500">
              <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                motors-sale.mw/
              </span>
              <input
                type="text"
                {...formik.getFieldProps("username")}
                id="username"
                autoComplete="username"
                className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Timezone
          </label>
          <div className="mt-2">
            <select
              id="timezone"
              name="timezone"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>Pacific Standard Time</option>
              <option>Eastern Standard Time</option>
              <option>Greenwich Mean Time</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex">
        <button
          type="submit"
          className="rounded-md bg-slate-800 px-3 w-18 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          {isLoading ? (
            <>
              <Loading /> Updating
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
