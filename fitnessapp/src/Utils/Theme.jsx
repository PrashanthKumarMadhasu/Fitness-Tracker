import './dummy.css'
export const lightTheme = {
  bg: "#FFFFFF",
  bgLight: "#FFFFFF",
  primary: "#007AFF",
  secondary: "#5B86E5",
  card_background:"#fff",
  disabled: "#b1b2b3",
  menubar: "#191c29",
  navbar: "#242B3F",
  arrow: "#AFAFB5",
  menu_primary_text: "#F2F3F4",
  menu_secondary_text: "#b1b2b3",
  table_header: "#242445",
  text_primary: "#404040",
  text_secondary: "#e8e1e1",
  card: "#FFFFFF",
  black: "#000000",
  white: "#FFFFFF",
  shadow: "#00000020",
  green: "#00ff6a",
  yellow: "#e8ba00",
  red: "#ef5350",
  orange: "#F7AD63",
  popup: "#242B3F",
  popup_text_primary: "#F2F3F4",
  popup_text_secondary: "#b1b2b3",
  output_node: "#49516b",
  theme: 'false',
  profile_label_bg:'#eee',
  profile_delete:'#000000',
  input_bg:'#fff',
  input_border:'#ddd',
  desc:'#3e4040',
  button_bg:'#007bff',
  button_hover:'#1358a7',
  tab_bg:'#fff',
  tab_text:'#007AFF',
  selected_tab_bg:'#007AFF',
  selected_tab_text:'#fff',
  sidebar_bg_1:'#d7f5f5',
  sidebar_bg_2:'#ebf3f3',
  sidebar_bg_3:'#ebf3f3',
  sidebar_bg_4:'#d7f5f5',
  sidebar_shadow:'#00000033',
  remainder_message_bg:'#96a1a733',
};


export const darkTheme = {
  bg: '#06121a',
  primary: "#007AFF",
  text_primary:'#b8cbde',
  text_secondary: "#323533",
  card_border: '#323533',
  card_background: '#02090d',
  black: "#000000",
  white: "#FFFFFF",
  shadow: "#00000020",
  green: "#00ff6a",
  yellow: "#e8ba00",
  red: "#ef5350",
  orange: "#F7AD63",
  theme: 'true',
  profile_label_bg:'#323533',
  profile_delete:'#fff',
  input_bg:'#10161f',
  input_border:'#2a2b2b',
  desc:'#b8cbde',
  button_bg:'#1358a7',
  button_hover:'#007bff',
  tab_bg:'#010f1a',
  tab_text:'#5792c0',
  selected_tab_bg:'#5792c0',
  selected_tab_text:'#010f1a',
  sidebar_bg_1:'#011216',
  sidebar_bg_2:'#021e24',
  sidebar_bg_3:'#021e24',
  sidebar_bg_4:'#011216',
  sidebar_shadow:'#0b2c3b33',
  remainder_message_bg:'#10161f',
}


import React from 'react'

const Theme = () => {
  return (
    <div className='dummy'>Theme</div>
  )
}

export default Theme