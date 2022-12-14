// import * as React from 'react';
// import styles from './Customitemrows.module.scss';
// import { ICustomitemrowsProps } from './ICustomitemrowsProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class Customitemrows extends React.Component<ICustomitemrowsProps, {}> {
//   public render(): React.ReactElement<ICustomitemrowsProps> {
//     return (
//       <div className={ styles.customitemrows }>
//         <div className={ styles.container }>
//           <div className={ styles.row }>
//             <div className={ styles.column }>
//               <span className={ styles.title }>Welcome to SharePoint!</span>
//               <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
//               <p className={ styles.description }>{escape(this.props.description)}</p>
//               <a href="https://aka.ms/spfx" className={ styles.button }>
//                 <span className={ styles.label }>Learn more</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

import * as React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { sp } from '@pnp/sp/presets/all';
import "@pnp/sp/items";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

const Customitemrows: React.FunctionComponent = () => {
  const [firstTextFieldValue, setFirstTextFieldValue] = React.useState('');
  const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');
  const onChangeFirstTextFieldValue = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setFirstTextFieldValue(newValue || '');
    },
    [],
  );
  const onChangeSecondTextFieldValue = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      if (!newValue || newValue.length <= 30) {
        setSecondTextFieldValue(newValue || '');
      }
    },
    [],
  );

  async function _alertClicked(){
    const list= sp.web.lists.getByTitle("Hello List");

    const i = await list.items.getById(Number(firstTextFieldValue)).update({
      FullName: secondTextFieldValue
    });

  }

  return (
    <Stack tokens={stackTokens}>
      <TextField
        label="Enter the Id you want to update"
        value={firstTextFieldValue}
        onChange={onChangeFirstTextFieldValue}
        styles={textFieldStyles}
      />
      <TextField
        label="Update Employee Name"
        value={secondTextFieldValue}
        onChange={onChangeSecondTextFieldValue}
        styles={narrowTextFieldStyles}
      />
      <DefaultButton text="Standard" onClick={_alertClicked} />
    </Stack>
  );
};

export default Customitemrows;

