// import { Modal, ModalHeader,  ModalBody, ModalFooter } from "@/components/modal/Modal.ts";
import Modal from '../components/modal/Modal.vue'
import ButtonSwitch from '@/components/buttonSwitch.vue'
import Tippy from '@/components/tippy.vue'
import Toast from '@/components/toast.vue'
import LoadingIcon from '@/components/loadingIcon.vue'  
import SearchSelect from '@/components/selectSearch.vue'
import MultiselectDropdown from '@/components/multiselectDropdown.vue'
import SingleSelect from '@/components/SingleSelect.vue' 
import CheckBox from '@/components/checkBox.vue'
import Modal1 from '@/components/Modal1.vue'
import PopupDropdown from '@/components/PopupDropdown.vue'
import SingleSelect1 from '@/components/SingleSelect1.vue'


import NotifyIcon from '../components/icons/NotifyIcon.vue'
import ErrorIcon from '../components/icons/ErrorIcon.vue'
import FilesIcon from '../components/icons/FilesIcon.vue'
import HomeIcon from '../components/icons/HomeIcon.vue'
import InboxIcon from '../components/icons/InboxIcon.vue'
import UserCircleIcon from '../components/icons/UserCircleIcon.vue'
import UserIcon from '../components/icons/UserIcon.vue'
import UsersIcon from '../components/icons/UsersIcon.vue'
import VideoIcon from '../components/icons/VideoIcon.vue'
import DayIcon from '@/components/icons/DayIcon.vue'
import NightIcon from '@/components/icons/NightIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import AppleIcon from '@/components/icons/AppleIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
import GoogleColorIcon from '@/components/icons/GoogleColorIcon.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import SpinIcon from '@/components/icons/SpinIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import XCircleIcon from '@/components/icons/XCircleIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import MoreIcon from '@/components/icons/MoreIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import CommonIcon from '@/components/icons/CommonIcon.vue'
import MoreInfoIcon from '@/components/icons/MoreInfoIcon.vue'
import CommandIcon from '@/components/icons/CommandIcon.vue'
import InvoiceIcon from '@/components/icons/InvoiceIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import OfferIcon from '@/components/icons/OfferIcon.vue'
import BriefCaseIcon from '@/components/icons/BriefCaseIcon.vue'
import AdminIcon from '@/components/icons/AdminIcon.vue'
import CreditCardIcon from '@/components/icons/CreditCardIcon.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import HelpIcon from '@/components/icons/HelpIcon.vue'
import SunriseIcon from '@/components/icons/SunriseIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import TagIcon from '@/components/icons/TagIcon.vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import CodesandboxIcon from '@/components/icons/CodesandboxIcon.vue'
import ShieldIcon from '@/components/icons/ShieldIcon.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import SmartphoneIcon from '@/components/icons/SmartphoneIcon.vue'
import MailIcon from '@/components/icons/MailIcon.vue'
import ReloadIcon from '@/components/icons/ReloadIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'
import ZoomIcon from '@/components/icons/ZoomIcon.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import DatabaseIcon from '@/components/icons/DatabaseIcon.vue'
import CheckCircleIcon from '@/components/icons/CheckCircleIcon.vue'
import CheckCircle2Icon from '@/components/icons/CheckCircle2Icon.vue'
import AlignJustifyIcon from '@/components/icons/AlignJustifyIcon.vue'
import AlertCircleIcon from '@/components/icons/AlertCircleIcon.vue'
import Link2Icon from '@/components/icons/Link2Icon.vue'
import ActiveAlertIcon from '@/components/icons/ActiveAlertIcon.vue'
import TargetIcon from '@/components/icons/TargetIcon.vue'
import FileMinusIcon from '@/components/icons/FileMinusIcon.vue'
import AlertTriangleIcon from '@/components/icons/AlertTriangleIcon.vue'
import MasterOrderIcon from '@/components/icons/MasterOrderIcon.vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import RightArrowIcon from '@/components/icons/RightArrowIcon.vue'
import SpecialOfferIcon from '@/components/icons/SpecialOfferIcon.vue'
import OrderIcon from '@/components/icons/OrderIcon.vue'
import ConnectedIcon from '@/components/icons/ConnectedIcon.vue'
import ProfitIcon from '@/components/icons/ProfitIcon.vue'
import PlanIcon from '@/components/icons/PlanIcon.vue'



export default (app: any) => {
  // Icons here
  app.component('NotifyIcon', NotifyIcon)
  app.component('ErrorIcon', ErrorIcon)
  app.component('FilesIcon', FilesIcon)
  app.component('HomeIcon', HomeIcon)
  app.component('InboxIcon', InboxIcon)
  app.component('UserCircleIcon', UserCircleIcon)
  app.component('UserIcon', UserIcon)
  app.component('UsersIcon', UsersIcon)
  app.component('VideoIcon', VideoIcon)
  app.component('DayIcon', DayIcon)
  app.component('NightIcon', NightIcon)
  app.component('MenuIcon', MenuIcon)
  app.component('CloseIcon', CloseIcon)
  app.component('GoogleIcon', GoogleIcon)
  app.component('AppleIcon', AppleIcon)
  app.component('XIcon', XIcon)
  app.component('GoogleColorIcon', GoogleColorIcon)
  app.component('FacebookIcon', FacebookIcon)
  app.component('SpinIcon', SpinIcon)
  app.component('EditIcon', EditIcon)
  app.component('XCircleIcon', XCircleIcon)
  app.component('AddIcon', AddIcon)
  app.component('MoreIcon', MoreIcon)
  app.component('EyeIcon', EyeIcon)
  app.component('DeleteIcon', DeleteIcon)
  app.component('CommonIcon', CommonIcon)
  app.component('MoreInfoIcon', MoreInfoIcon)
  app.component('CommandIcon', CommandIcon)
  app.component('InvoiceIcon', InvoiceIcon)
  app.component('SearchIcon', SearchIcon)
  app.component('OfferIcon', OfferIcon)
  app.component('BriefCaseIcon', BriefCaseIcon)
  app.component('AdminIcon', AdminIcon)
  app.component('CreditCardIcon', CreditCardIcon)
  app.component('HelpIcon', HelpIcon)
  app.component('CopyIcon', CopyIcon)
  app.component('SunriseIcon', SunriseIcon)
  app.component('SunIcon', SunIcon)
  app.component('TagIcon', TagIcon)
  app.component('LoaderIcon', LoaderIcon)
  app.component('StarIcon', StarIcon)
  app.component('CodesandboxIcon', CodesandboxIcon)
  app.component('ShieldIcon', ShieldIcon)
  app.component('LockIcon', LockIcon)
  app.component('SmartphoneIcon', SmartphoneIcon)
  app.component('MailIcon', MailIcon)
  app.component('ReloadIcon', ReloadIcon)
  app.component('EyeOffIcon', EyeOffIcon)
  app.component('UploadIcon', UploadIcon)
  app.component('ZoomIcon', ZoomIcon)
  app.component('ListIcon', ListIcon)
  app.component('ClockIcon', ClockIcon)
  app.component('DatabaseIcon', DatabaseIcon)
  app.component('CheckCircleIcon', CheckCircleIcon)
  app.component('CheckCircle2Icon', CheckCircle2Icon)
  app.component('AlignJustifyIcon', AlignJustifyIcon)
  app.component('AlertCircleIcon', AlertCircleIcon)
  app.component('Link2Icon', Link2Icon)
  app.component('ActiveAlertIcon', ActiveAlertIcon)
  app.component('TargetIcon', TargetIcon)
  app.component('FileMinusIcon', FileMinusIcon)
  app.component('AlertTriangleIcon', AlertTriangleIcon)
  app.component('MasterOrderIcon', MasterOrderIcon)
  app.component('GlobeIcon', GlobeIcon)
  app.component('MapIcon', MapIcon)
  app.component('DownloadIcon', DownloadIcon)
  app.component('RightArrowIcon', RightArrowIcon)
  app.component('SpecialOfferIcon', SpecialOfferIcon)
  app.component('OrderIcon', OrderIcon)
  app.component('ConnectedIcon', ConnectedIcon)
  app.component('ProfitIcon', ProfitIcon)
  app.component('PlanIcon', PlanIcon)
  



  // Component

  app.component('Modal', Modal)
  app.component('ButtonSwitch', ButtonSwitch)
  app.component('Tippy', Tippy)
  app.component('Toast', Toast)
  app.component('LoadingIcon', LoadingIcon)
  app.component('SearchSelect', SearchSelect)
  app.component('MultiselectDropdown', MultiselectDropdown)
  app.component('SingleSelect', SingleSelect)
  app.component('CheckBox', CheckBox)
  app.component('Modal1', Modal1)
  app.component('PopupDropdown', PopupDropdown)
  app.component('SingleSelect1', SingleSelect1);

  // app.component("ModalHeader", ModalHeader);
  // app.component("ModalBody", ModalBody);
  // app.component("ModalFooter", ModalFooter);
}
