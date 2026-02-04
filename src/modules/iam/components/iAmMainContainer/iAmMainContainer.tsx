import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import PersonIcon from "@mui/icons-material/Person";

import styles from "./iAmMainContainer.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { TabsContent } from "@/global/components";
import { UsersTabContent } from "../usersTabContent/usersTabContent";
import { AccountsTabContent } from "../accountsTabContent/accountsTabContent";
import { PermissionsTabContent } from "../permissionsTabContent/permissionsTabContent";
import { RolesTabContent } from "../rolesTabContent/rolesTabContent";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const IAmMainContainer = ({ LANGUAGE }: Props) => {
  const tabOptions = [
    {
      text: LANGUAGE.iam.tabs.users,
      icon: PersonIcon,
    },
    {
      text: LANGUAGE.iam.tabs.accounts,
      icon: AccountBalanceWalletIcon,
    },
    {
      text: LANGUAGE.iam.tabs.permissions,
      icon: EmojiFlagsIcon,
    },
    {
      text: LANGUAGE.iam.tabs.roles,
      icon: LabelImportantIcon,
    },
  ];

  return (
    <div className={styles.iAmMainContainer}>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            <UsersTabContent LANGUAGE={LANGUAGE} />
          </div>,
          <div key={2}>
            <AccountsTabContent LANGUAGE={LANGUAGE} />
          </div>,
          <div key={3}>
            <PermissionsTabContent LANGUAGE={LANGUAGE} />
          </div>,
          <div key={4}>
            <RolesTabContent LANGUAGE={LANGUAGE} />
          </div>,
        ]}
      />
    </div>
  );
};
