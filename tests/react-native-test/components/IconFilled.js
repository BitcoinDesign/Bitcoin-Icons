import { AddressBookIcon, AlertIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, BellIcon, BitcoinCircleIcon, BitcoinIcon, BlockIcon, BrushIcon, CalendarIcon, CarIcon, CaretDownIcon, CaretLeftIcon, CaretRightIcon, CaretUpIcon, CartIcon, ChannelIcon, ChannelsIcon, CheckIcon, ClearCharacterIcon, ClockIcon, CloudIcon, CodeIcon, CoinsIcon, Confirmations0Icon, Confirmations1Icon, Confirmations2Icon, Confirmations3Icon, Confirmations4Icon, Confirmations5Icon, Confirmations6Icon, ConsoleIcon, ContactsIcon, CopyIcon, CreditCardIcon, CrossIcon, DevicesIcon, EditIcon, EllipsisIcon, ExchangeIcon, ExitIcon, ExportIcon, FileIcon, FlipHorizontalIcon, FlipVerticalIcon, GearIcon, GlobeIcon, GraphIcon, GridIcon, HiddenIcon, HomeIcon, InfoIcon, InvoiceIcon, KeyIcon, LightningIcon, LinkIcon, LockIcon, MagicWandIcon, MenuIcon, MilkIcon, MinerIcon, MiningIcon, MinusIcon, MixedIcon, MnemonicIcon, MoonIcon, NoDollarsIcon, Node0ConnectionsIcon, Node1ConnectionIcon, Node2ConnectionsIcon, Node3ConnectionsIcon, NodeHardwareIcon, NodeIcon, PantheonIcon, PasswordIcon, PhotoIcon, PieChartIcon, PlusIcon, PointOfSaleIcon, ProxyIcon, QrCodeIcon, QuestionIcon, ReceiveIcon, RefreshIcon, RelayIcon, RocketIcon, SafeIcon, SatoshiV1Icon, SatoshiV2Icon, ScanIcon, SdCardIcon, SearchIcon, SendIcon, ShareIcon, SharedWalletIcon, ShieldIcon, SnowflakeIcon, SofaIcon, SunIcon, TagIcon, TransactionsIcon, TransferIcon, TrashIcon, TwoKeysIcon, UnlockIcon, UnmixedIcon, UsbIcon, VisibleIcon, WalletIcon } from '@bitcoin-design/bitcoin-icons-react-native/filled';
import {Component} from 'react';

export default class IconFilled extends Component {
    components = {
        AddressBookIcon, AlertIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon,
        BellIcon, BitcoinCircleIcon, BitcoinIcon, BlockIcon, BrushIcon,
        CalendarIcon, CarIcon, CaretDownIcon, CaretLeftIcon, CaretRightIcon, CaretUpIcon, CartIcon, ChannelIcon,
        ChannelsIcon, CheckIcon, ClearCharacterIcon, ClockIcon, CloudIcon, CodeIcon, CoinsIcon, Confirmations0Icon,
        Confirmations1Icon, Confirmations2Icon, Confirmations3Icon, Confirmations4Icon, Confirmations5Icon,
        Confirmations6Icon, ConsoleIcon, ContactsIcon, CopyIcon, CreditCardIcon, CrossIcon,
        DevicesIcon,
        EditIcon, EllipsisIcon, ExchangeIcon, ExitIcon, ExportIcon,
        FileIcon, FlipHorizontalIcon, FlipVerticalIcon,
        GearIcon, GlobeIcon, GraphIcon, GridIcon,
        HiddenIcon, HomeIcon,
        InfoIcon, InvoiceIcon,
        KeyIcon,
        LightningIcon, LinkIcon, LockIcon,
        MagicWandIcon, MenuIcon, MilkIcon, MinerIcon, MiningIcon, MinusIcon, MixedIcon, MnemonicIcon, MoonIcon,
        NoDollarsIcon, Node0ConnectionsIcon, Node1ConnectionIcon, Node2ConnectionsIcon, Node3ConnectionsIcon,
        NodeHardwareIcon, NodeIcon,
        PantheonIcon, PasswordIcon, PhotoIcon, PieChartIcon, PlusIcon, PointOfSaleIcon, ProxyIcon,
        QrCodeIcon, QuestionIcon,
        ReceiveIcon, RefreshIcon, RelayIcon, RocketIcon,
        SafeIcon, SatoshiV1Icon, SatoshiV2Icon, ScanIcon, SdCardIcon, SearchIcon, SendIcon, ShareIcon, SharedWalletIcon,
        ShieldIcon, SnowflakeIcon, SofaIcon, SunIcon,
        TagIcon, TransactionsIcon, TransferIcon, TrashIcon, TwoKeysIcon,
        UnlockIcon, UnmixedIcon, UsbIcon,
        VisibleIcon,
        WalletIcon
    };

    render() {
        const ComponentName = this.components[ this.props.tag ];
        return <ComponentName color={ this.props.color } size={ this.props.size } />;
    }
}
