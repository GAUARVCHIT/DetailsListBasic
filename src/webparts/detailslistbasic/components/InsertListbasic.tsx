import * as React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { DatePicker, Dropdown, DropdownBase } from '@fluentui/react';
import { DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const stackTokens = { childrenGap: 15 };

type TInsertFunctionPassedArguments = {

    invoiceDescription: string,
    invoiceDate: string,
    invoiceAmount: string,
    employeeName: string,
    status: string,
    tittle: string,
    fullName: string,

}

type InsertListbasicProps = {
    gettingDataFromInsertListbasic: (passedValuesThroughFunction: TInsertFunctionPassedArguments) => void
}

const dropdownControlledExampleOptions = [
    { key: 'Pending Aproval', text: 'Pending Aproval' },
    { key: 'Approved', text: 'Approved' },
    { key: 'More Information required', text: 'More Information required' },
    { key: 'paid', text: 'paid' },
];

const InsertListbasic: React.FunctionComponent<InsertListbasicProps> = (props: InsertListbasicProps) => {
    const [invoiceDescription, setinvoiceDescription] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
    const [invoiceAmount, setinvoiceAmount] = React.useState('');
    const [employeeName, setemployeeName] = React.useState('');
    const [status, setstatus] = React.useState<IDropdownOption>();
    const [tittle, settittle] = React.useState('');
    const [fullName, setfullName] = React.useState('');



    const onChangeInvoiceDescription = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setinvoiceDescription(newValue || '');
        },
        [],
    );

    const onChangeinvoiceAmount = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (!newValue || newValue.length <= 30) {
                setinvoiceAmount(newValue || '');
            }
        },
        [],
    );

    const onChangeemployeeName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setemployeeName(newValue || '');
        },
        [],
    );

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setstatus(item);
    };

    const onChangetittle = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            settittle(newValue || '');
        },
        [],
    );
    const onChangefullName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setfullName(newValue || '');
        },
        [],
    );

    function _onClickHandler() {

        let value: TInsertFunctionPassedArguments = {
            invoiceDescription: invoiceDescription,
            invoiceDate: selectedDate.toISOString(),
            invoiceAmount: invoiceAmount,
            employeeName: employeeName,
            status: status.text,
            tittle: tittle,
            fullName: fullName,
        }
        // console.log(status);

        props.gettingDataFromInsertListbasic(value);
    }

    return (
        <Stack tokens={stackTokens}>
            <TextField
                label="Invoice Description"
                value={invoiceDescription}
                onChange={onChangeInvoiceDescription}
                styles={textFieldStyles}
            />
            <DatePicker
                value={selectedDate}
                onSelectDate={setSelectedDate as (date: Date | null | undefined) => void}
                placeholder="Select a date..."
                ariaLabel="Select a date"
            />
            <TextField
                label="Invoice Amount"
                value={invoiceAmount}
                onChange={onChangeinvoiceAmount}
                styles={textFieldStyles}
            />
            <TextField
                label="Employee Name"
                value={employeeName}
                onChange={onChangeemployeeName}
                styles={textFieldStyles}
            />
            <Dropdown
                label="Controlled example"
                selectedKey={status ? status.key : undefined}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onChange}
                placeholder="Select an option"
                options={dropdownControlledExampleOptions}
                styles={dropdownStyles}
            />
            <TextField
                label="Tittle"
                value={tittle}
                onChange={onChangetittle}
                styles={textFieldStyles}
            />
            <TextField
                label="Full Name"
                value={fullName}
                onChange={onChangefullName}
                styles={textFieldStyles}
            />

            <DefaultButton text="Standard" onClick={_onClickHandler} />
        </Stack>
    );
};

export default InsertListbasic;
{/* <TextField
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
/> */}