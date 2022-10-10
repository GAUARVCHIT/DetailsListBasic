import * as React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { sp } from '@pnp/sp/presets/all';
import "@pnp/sp/items";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type TfunctionPassedArguments={
    id: number,
    updateName: string,
}
type UpdateListbasicProps={
    gettingDataFromUpdateListbasic: (passedValuesThroughFunction: TfunctionPassedArguments)=>void
}

const UpdateListbasic: React.FunctionComponent<UpdateListbasicProps> = (props: UpdateListbasicProps) => {
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

  async function _onClickHandler(){
    // const list= sp.web.lists.getByTitle("Hello List");

    // const i = await list.items.getById(Number(firstTextFieldValue)).update({
    //   FullName: secondTextFieldValue
    // });
    props.gettingDataFromUpdateListbasic(5,'saurav');
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
      <DefaultButton text="Standard" onClick={_onClickHandler} />
    </Stack>
  );
};

export default UpdateListbasic;

