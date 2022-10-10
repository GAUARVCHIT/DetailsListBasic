
import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { sp } from '@pnp/sp/presets/all';
import "@pnp/sp/items";
import { Stack } from '@fluentui/react/lib/Stack';
import UpdateListbasic from './UpdateListbasic';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
const stackTokens = { childrenGap: 15 };

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

// const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IDetailsListCompactExampleItem {
  key: number;
  name: string;
  status: string;
  title: string;
  date: string;
  buyerName: string;
  buyerEmail: string;
}

export interface IDetailsListCompactExampleState {
  items: IDetailsListCompactExampleItem[];
  selectionDetails: string;
}

type TfunctionPassedArguments = {
  updateId: number,
  updateName: string,
}

export default class Detailslistbasic extends React.Component<{}, IDetailsListCompactExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListCompactExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

    this._allItems = [];

    this._columns = [
      { key: 'column1', name: 'Employee Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column3', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column4', name: 'Invoice Date', fieldName: 'date', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column5', name: 'Buyer Name', fieldName: 'buyerName', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column6', name: 'Buyer Email', fieldName: 'buyerEmail', minWidth: 100, maxWidth: 200, isResizable: true },

    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
    };
  }


  public async componentDidMount() {
    const list = sp.web.lists.getByTitle("Hello List");

    // const i = await list.items.getById(1).update({
    //   Tittle: "CEO",
    //   FullName: "Pinky"
    // });

    let items: any[] = await list.items.select('Id', 'FullName', 'Status', 'Tittle', 'InvoiceDate', 'Buyer/EMail', 'Buyer/Title').expand('Buyer')();

    // const item= sp.web.lists.getByTitle("listname").items.getById(8).select("Customer/Title","Customer/ID","Customer/EMail").expand("Customer").get();
    //   console.log("item: ", item);

    console.log(items);
    items.map((ele: any) => {

      let nowdate: Date = new Date(ele.InvoiceDate);
      let finaldate = (nowdate.getMonth() + 1) + '/' + nowdate.getDate() + '/' + nowdate.getFullYear();



      this._allItems.push({
        key: ele.Id,
        name: ele.FullName,
        status: ele.Status,
        title: ele.Tittle,
        date: finaldate,
        buyerName: ele.Buyer.Title,
        buyerEmail: ele.Buyer.EMail,
      })
    });

    this.setState({
      items: this._allItems,
    })
  }

  public async gettingDataFromUpdateListbasic(args: TfunctionPassedArguments) {
    console.log('gaurav' + args.updateName + args.updateId);

    const selectionId = (this._selection.getSelection()[0] as IDetailsListCompactExampleItem).key;
    console.log('ItemIndex' + selectionId)

    let list = sp.web.lists.getByTitle("Hello List");

    const i = await list.items.getById(Number(selectionId)).update({
      FullName: args.updateName
    });


    this._allItems = [];
    list = sp.web.lists.getByTitle("Hello List");

    // const i = await list.items.getById(1).update({
    //   Tittle: "CEO",
    //   FullName: "Pinky"
    // });

    let items: any[] = await list.items.select('Id', 'FullName', 'Status', 'Tittle', 'InvoiceDate', 'Buyer/EMail', 'Buyer/Title').expand('Buyer')();

    // const item= sp.web.lists.getByTitle("listname").items.getById(8).select("Customer/Title","Customer/ID","Customer/EMail").expand("Customer").get();
    //   console.log("item: ", item);

    console.log(items);
    items.map((ele: any) => {

      let nowdate: Date = new Date(ele.InvoiceDate);
      let finaldate = (nowdate.getMonth() + 1) + '/' + nowdate.getDate() + '/' + nowdate.getFullYear();



      this._allItems.push({
        key: ele.Id,
        name: ele.FullName,
        status: ele.Status,
        title: ele.Tittle,
        date: finaldate,
        buyerName: ele.Buyer.Title,
        buyerEmail: ele.Buyer.EMail,
      })
    });

    this.setState({
      items: this._allItems,
    })

  }



  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <div>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        <TextField
          className={exampleChildClass}
          label="Filter by name:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            compact={true}
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        </MarqueeSelection>
        <UpdateListbasic gettingDataFromUpdateListbasic={this.gettingDataFromUpdateListbasic.bind(this)}></UpdateListbasic>
      </div>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListCompactExampleItem).key;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.title.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked(item: IDetailsListCompactExampleItem): void {
    alert(`Item invoked: ${item.name}`);
  }
}

    // for (let i = 0; i < 10; i++) {

    // }


    // this._allItems.push({
    //   key: 1,
    //   name: 'Sandeep A',
    //   status: 'submitted',
    //   title: 'manager',
    // });

    // this._allItems.push({
    //   key: 2,
    //   name: 'Atanu Sinha Mahapatra',
    //   status: 'in draft',
    //   title: 'senior manager',
    // });

    // this._allItems.push({
    //   key: 3,
    //   name: 'Gaurav Kumar',
    //   status: 'submitted',
    //   title: 'senior',
    // });
