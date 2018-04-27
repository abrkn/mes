const { state } = require('../state');

function injectCssStateClasses() {
  // Add missing css class to "Like Memo" buttons
  $(`.post .actions a[href^='memo/like']`).addClass('like-button');

  // Add missing css class to "Reply" buttons
  $(`.post .actions a[href^='memo/reply/']`).addClass('reply-button');

  //add class to secondary nav buttons
  $(`.nav a[href^='disclaimer']`).addClass('disclaimer-button btn');
  $(`.nav a[href="logout"]`).addClass('logout-button btn');


  //add btn class to nav items
  $(`.header .nav a`).addClass('btn');

  $(`a[href='memo/new']`).addClass('new-memo-button');


  //icon
  $(
    "<img style='width:13px; margin-right:3px; vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALxSURBVGhD7ZhLiM1RHMfn6RUy5bEhG0RR0sRmapRJTTY2Hgt7sRKRhWxs1IQpsbBgo5ASkiiWFlNMKTZEKTVNNE0eSXL5/M75Utdt7j3nf+/9/0/6f+rbefzeNTX3fzoaUalUtqAbaOJXvkxT8xHrLtSpdrJBosPop0tbIPRwnaVXbcVB4E4SVFymBKCVEbUWB4GvlMPB+SsaZ/s0D1HrA+tfOP9AK9ReGARsULyD8xu0TOZcoN5sdEctODgfkDkMAoYV6+B8SqZcoe52teDgHPfnRcAOxf7huEy5Qt0BX95DXxdlCqMcpMVQtxzEUQ7SYqib/iDU2IQeo4O6qoG6fdjHfAvpDnJZua3BsyxdMlXB/Tzst+WX5CD3lNvB+RaaK3MVmLuxnUfpD2JwN4aWyqUGbOu0DaOoQQzu37KslVtzFDmIgW0KDco1O1kGwacH9YWKGg9ZZwT7d7RP6bMROwj+e9Fn+bYMchon2Wb71CU4dpB38msL5L/CMkvlwokdBPu0d2sf9GQPEYtUMowUBzHo6wVaqbKNSXUQg94mUL9K1yflQQz6+4JWqfzMpDwIvdlryn6Vrk+qg9DXJzSsso1JcRB6es+yUSXDiB0E/0n5tQXyP0fLVS6c2EGwn/ZurYdeHqAFKhVH7CAGMf342ct5kPB/xloXfC6x9KhEPFkGiYUa9X792uN58zWLHIT7b2iP3JqjqEG4+8gyIJcasM3XNowiBuH8Gq2WuQZsu9E5HcMgII9Briq3DfGEZbFMNWA/ioz0Hh/IOUSdSXSN/RxdV8G9vZ5csAaMJAcJgbrlk6mjHKTFULccxPHfDsL5hEy5QumtvgMPfYzKFAYBmxXr4Gz/sLplzg3qjvgOPJyPyBQGMb0ETflwD+dxdIatfXu0XdS6z/ovcV+IBomOKTgJ6OeuWouDWPt5cNOnKRb6eImWqLV4yNFFgkPIPvxzh7r2ajKKFqql5iBnJ8nWoEH2Q+0Wdbah9ewDH647On4Df++3nsnyaMwAAAAASUVORK5CYII='>"
  ).prependTo($('.logout-button'));

  $(
    "<img style='width:18px; margin-right:3px; vertical-align:middle; margin-top:-2px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAWzSURBVGhDxZrLjxRVFMYnyoy6cwYREFkosnEgLly51cREDRgfoGhMVBAcJBHNDPwDvo0zbHRpjISdW8WlifJQlIUrwIWIYEAGBRWjDgz+vnu/qu7qR/Wt7p7hl3ypOud8596qnu56zkA/mJ2dXYw2oF3oc3QU/Yb+tbSu3F40hZ5Ai91+dWADRtA2dOhKF9AnDqJthMMedu5hwmVoEv0VN6V3NBZ6j9Ulnqb/MPggk+xAf4ZZ5wCNjSZYXeBp+wODrkSH4zTNULuEvkKvoUfRnaSH0aA1TG7UNXn2o0vkW0LtO7TS0/cGAz2MLnjsAuSPo3F0i+3JqAdNoJ88XAHyF9Aa27uDATahpk+K3GnVWB20tWs0huf5NQxeh+ZGG22tBv2baZ6NQxX4CN1oW99gTH3N9oQZ6tA2QLWdoGEtKnzyxDqeP2dLW2y/4rAp7gRzPK+53BbQtqC1tpSDUT/Ywnee+CK635ZS3NL1DgjNpTndmnGe3ApbWoNJ38fC0YZYn/x9tnTEbT3tgGBO7UThLwHfovaHWBp2RF+BZ11Owj0974Bge3SgKEDuVZeLUNAZtnCSIv7Y5bbY2hL6//Oq1t9HOg/c4NYk8O/2EAHiP1g0n7EpTEZLhPgMi45Hm+hOh3FPouSjCt6FqHCIJX7H5YhNhWsb4qRJbK9M00aUgHeL2wLE+qbULgBJ6Iowh/g4i6STVOyoDnOIez1MKdiH8J6InRHirS6HHfjG+QDxuEsdcUsOvd+7FCDWZffT6KQtOeQ+sa0jeHe6LUB8IBRYX0KQn3FZ1UljaSgm4LYcegs7kEH+LltyyJ1yuSN4dZC57Fb1ikUqPOlcgHife5JwWw79LXdAUPvRtgDxjEtJ4D/g1gDxeiV3OQ4Qv25/Em7Lob9sB3RkyyGedikJ/G+6NUA8peRexwHiR+xPwm059LfcAUp3R0cNvF+6nAT+x90aIP5UyR8cB4hH7U/CbTn0F3aAlK4ydRPfdN1Pbsy2JPCvcmuA+JiS5xxnVLrBdk9lmHcfi2s9TBL0LIzdEeKzSjZeMA3Zn4R7KsGcf6Okq9t6aB2KI0QY45+rsgN1fMH8yz1UR/C33IGr8hXKYP5jLJI+NLwtv0KNP+JV9ifhthz6m45CpK8hfyt6Bp2Kzhrkkn7M+Fa7JUB8VMl5OYxmUL/H1hxy+10uBV/Lw+iU4wDxnJ3IMvCctj1AfM6lUvA1nsgmlZy3S4kMPIVzAvFFl0rB97VbMtYpeTNqvJhLflDlthx6O32FRm3NIXfE5bbgWY4KF3MsbsqKB2M6QjwRCgm4JYfeph0gdx2l21m+hH6JzhrkPrC1LXgaL6drvxsN7HyAWH/iOb2hyWCuGVR65MOmG5qfY0eE+EWXww7olrLxhn6Ty6XY3jXM87KHaos21vaAt7V4viKp5/M5xLqR7nhSi+7qML6er27wMG3Bow932m0B4rddrkFyKWr8K+x2uS22doSxtMGH0YfoKVLXe4hS8BaelxLrqXXr11MUxu3LIVfpwarb+vJgi7bNsbsG27Pd5Wao62WEHt/l0KBHi8lXjm7reQeY8yHN7fYAsd7Hlb+9wXQHpvOhw5Cb74e7D2hOt2bo4e5ttpSDsd3j9Y5HJtu73gHm2ILyR5JC24Kqva3RxqKmFxyk9qAR2/oGY+po0/IFB4tKD5hz6N2IWr1iOoteYLXSzU8rNAZjjWnMMHgd5GZYdLfxGQyyBrV7yXcC7UTLbE+GHt0fqLdwhs0g/zt60PbeYKAVqO0beWqXkd66v4EeQ6vRCCXdAuoT1uNF5XQ9/xZLefMLs0aoHUJpP9hUGHcBg76C9Hx+TmBsnaS2s9rfF931MIH+seNdVDhr94LG8pjz9w8gzKsHVluR3ro3Ha06oR5Q7xhhpQcJfYeNWITWI/0TyGfoCJpGOndIWldONV00rkPxZqQnBgb+B+oM4YwUYtbdAAAAAElFTkSuQmCC'>"
  ).prependTo($('.btn-leave'));

  $(
    "<img style='margin-right:3px; vertical-align:middle; width:18px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASVSURBVHhe7ZpdiBZlGIbXFFvUUDBFREEKxSAxIkFEOjBF/KFIEukgggJRIRJPWkSUfk6MQAQNBEUU/DnQCM/0VDrqQIREzQR/IIL8KTE1sl2vZ+be3Zmded95Z3b32/3kveBhvnme+5739eb7m2/tiEQikUgkEolEBk93d/dr1Bbqi2Goz6lFWmp00dPTM5bNfU9183hYYYkfqYlaenTAhnZqfy2B9Y5q6ZGH/YxjQ/fTrbUG1jNmaQtDD2vMp5aXFQu/LlkC56/Sbzmsu1JbSKA1h3LteSHHsZK6QbiI+gWxE+bHJE/gfIFGLYV112gLCbS60kk56G9QayUvwnAuur9SuRt0bRmAgecp9bYseRgcks4LurYNwMB3XpY8DK5I4+U5COAph3Gy9cPgZirx0+4BiMmy9RMDCAgAzX3qY1kS6gaA/hq1mYf2Ufsyj9+hgl5+WfC0NgDmv1KFLx/0ggNAe5bDBFn7oDeJ2TLqaiIMAO3AAKbQ+4D6M1V4aRRA6Y0I/aAA0NmzZ6pspSCbgeZR6vCDLhdAL/QXS+KjXgDMLkhWgFloAEdk8WI6WbygKw3AYPazZC5qB3BCsgLMQgPYIYsXdNtl8YLOF8BRyVzUDuCMZAWYhQawWxYv6HbJ4gWdL4DjkrmoHcADDlMkzcEsNIDLHCpvSNCdTx1+0JUGwMjuTn9PVU7qvwnCK5LmwBcawN8cOmVzgu5C6vCDzhVAJ1V1T9MogBmS5qgRwF0OL8jmZLAB0H+RsrB91A+A+UlJc9APCsBA+6VspTD/RNJK0LoC+FYSH42eAcZSyfvAVyeAx1TpLzn0J1K3JK0EbSEAerOpx5L4aBYAmuvUNFkSOA8OwEBvb3K5b4Ocj6F/LBEEgj4XAK0J9H5Kp5U0fgbYwodlSeC8VgAGnm2yJ3C+QqNg8OQCsGtqFMKgAhiKu8Eu2RPsH6N+MOaRPYFWS+4G/6fekyWB87ovgUfmkT2Btt0VVn1250A/8BmwwK6tcRX1AmD2H/UDtVjyPugFBYDuH+oQNU/WHPSnU99RIXdzhQAMuzZ1kHoomYuwAOgZ+6mZkhVg5g2A+RPqGx6WfpMcCFr7HLc/r91Lr1AO80IAvTCezHwX9SRVFwgOYKvGTtA4A2BmL5nVktYCn/2W7/xGx9wZQC9oVtkeZMlSHQDnlziM0dgJOl8ApyRrBP6vdakCzCoDMNCdliVLUABfaeQFnS+ADZI1Av+bulQBZqEBfChLlqAAPtXICzpfAEskawT+qbpUAWahASyRJUtQAH9Q9s1vYO2RJYFzXwC3M75GpUsVYJYLgPNNWV+mbsuSJexNsAx0z+3P4r9p6KXdA8Bn/4ljvGz90D+VSvyga/cALsqSh8Fb1L/SOUHT7i+B9bIU4aLrqDsSltKuAaC3e5DPJHeD6CXqfTwby4rZMkkTOJ9Hv+Wwbu4bJq03KNeeN1C53zGGDBbo5OKhd2FDhgWvLYw8bGa/9tUSWO+clh4dsCf7Oepcur3hhXUuUs670xGDvdnveu9Se6kDw1D7qI9Yp/gZHolEIpFIJBKJROrR0fEMFiPTSmpJePEAAAAASUVORK5CYII='>"
  ).prependTo($("html a[href*='profiles']"));

  $(
    "<img style='width:16px; margin-right:3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFwSURBVGhD7dnBSoJRFIVRn8Om9e4FvpkQVnPr/LTckzgRgt0r3AX/5OOoW5rZblmWZT7n8/mpnkM975+DbRvqeannwbzf1eFjPa9eP43adKxnb2avjg5eM53a9mJmr44+3E+ntr2Z2XM7LTN77qZlZs/dtMzsuZuWmT13IQ9jRsg9dyEPY0bIPXchD2NGyD13IQ9jRsg9dyGHfDM+JuSQe+5CDvlmfEzIIffchRzyzfiYkEPuuQs55JvxMSGH3HMX8jBmhNxzF/IwZoTccxdyyCH/6NfydiGH3HMXcsghry9w4e1CDrnnLuSQQ76fL/DfzAi55y7kYcwIuecu5JBD/tGv5e1CDrnnLuSQQ15f4MLbhRxyz13IIYd8P1/gv5kRcs9dyMOYEXLPXcjDmBFyz13Iw5gRcu88wf8EOn/6cXf7Cdv9dLZtZvbqaF/P0WumsW3atpn5uzp8qGf7S5y+Xz7UqbY8b5vMW5ZlmcZu9wXoXpdgOSs3fgAAAABJRU5ErkJggg=='>"
  ).prependTo($("html .header a[href*='new-posts']"));

  $(".header .nav .btn:contains('Dashboard')").html(
    "<img style='width:16px; margin-right:3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ8SURBVGhD7Zjdi1RlHMfXZE1pb7JCV1tvFLQ/wP4Jb8JqcSXwBSQ1X7CLQo3QO2802+zOrrWSIAKp9c5LEwWDCjbICxV8RVODfNnt832e75z1mTn7cs6cw8zFfODHzO/9Ozuz85w5fT169GifiYmJQWwjNor9go1j97AnNj1XTLkvsZHJycmlbu8MiHgD24v9iphSqBfbrVkeWz8sG8L0l35sHW2jWZjemTe9pnrYs4AFB7B/49rq8QvZz9MFXlsNDFzD4N/Clmkgfwk7im3F1jqcoZhzqrnscC7kr/Cwxuvbg2HD2MM4OoX4NUzvyiqXZ7gkw+EM9WAHsesuSSD+EHvX5eVgwEfYc8/MIHYD28PThS4tDXMWaZZmxulTEHuG7XRpMWjc4TnNfEduscsqQzM1O65IkRaXzQ0aRrBn7s8g9o1LakM7vC7DWt5xycxQ/Bb2KLamEH+KrXNp5Wi2dnhdAnH9T6x2aT4UvIzpGyAXcn/wUNsJqtnekQs5fXv1u7wVCg7E0imIncT0l69VfAPt0C7vPBlEvACxT1yaQkInbHK64p92bh1ureKZ/xJ7XvFzvYjwUZUGaWmAr4/SoHIJBEddE8DX9/OrTtcKu1ay6wg236EMabCWDPxjTkeIvU4wuUTA3+50bbBmHnt2YDexlsOwAbmdUVUEX5ccrzkdCnQoZeD/zUO11yNNsEMf2THv2+VwLtJCzVXVNkh68C/GcITkPqdqgfmbWHPfu87xMM+paaHuY9U3wL/QSAw6FsB/ji0LyYph7hLsR68SehErnJ4R+pZLW2wLOsUSJTY6FsA/755KYfT7zL4dt0Twtzg9J6TNrQH8DQo2f/t87vpKYN5i7JTHZxD7ySVzhp7Dbg/gf6Hgz/YD+OtdXxpm6B/0DPYP1nJpQOwOD4XPFfreixMi+GcV/Mt+AH/m641ZoF/i73pcLuSHXV4IafOIAP64gvfsJ7inMMw74xG5kP/WpYVwewKz7mjhf/YT3FcY5uX+ehPkdH0zdQAVwCMSpF0LW677hfsKM8sLeOCywnhEAvOeKBEOlGbcVxiG/uARLZAr9fERHtHMfS0ctxPAf9s9pWCE7mC0/F8Ru4u1dd9H2jwugP+ngjrKX2Sz60vDTH0TfY89YJ7eYf2ObvumFTO2BIUGf0zB4/YD+Edd33Wg7ZhlBuQr+IH9AP4V13cdaPvdMgP4IwouwyYcC+CudE/XIE2WF7DmeJrzpPly+rOQ6CKkyfIaXHQqJD90MICvu2S1/qApAnp09y65cyfNTod3YABLzgMKtjndcdCy3bIaSOuA0xGKvoq5CP4trNSxXyXSIC2WFcAfdXoK4itIJJcB+Cec7hho+NpyAtaY/yuO5KexLBSex4ac6hjSIC2WJV35N7YE+X4KdGvxENZyj6ZTSIs0Wdv0txYFRYv8tOvoZm09evQoRV/f/xjNcKCxfOJgAAAAAElFTkSuQmCC'> Dashboard"
  );



  $( "<img style='margin-right:3px; margin-top:-4px; width:18px;vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASESURBVHhe7dnNbhRHFMVxJ+AQAiyDBAIEUhRAeY/EVlYoYU8MTwFCYgFSlEUMGCQ/RCB5BBYOMmLBA2QTvhIhFoCQjWFhOFX9z2nGds1HuXtSI/VPKs3U6du3b/sTN1OdTqfT6XQ6nc7W3k84biMffSYWt5GPPhOL28hHn4nFbeSjjxEXizGNOB99jLhYjGnE+ehjxMViTCPORx8jLhZjGnE++hhxsRjTiPPRx4iLxZhGnI8+RlwsxjTifPQx4mIxphHno48RG7ERG3FruIwRG3E++hixERuxEbeGyxixEeejjxEbsREbcWu4jBEbcT76GLERG7ERt4bLGLER56OPEReLMY04H32MuFiMacT56GPExWJMI85HHyMuFmMacT76GLERG7ERt4bLGLER56OPERuxERtxa7iMERtxPvoYsREbsRG3Zn19fVXrsd7e0esvVVpjjHz0MWIjNmIj/t8wRj76GHHr9Nncrcv9rNd31ZXz6PzzetlJ29FVbWrErdJljmrwB9UVt0+97mkdoP1o6GHErdGgh7X+5nI9Qq51Tes7reNae1jh/YzWgtYjynsof6h1kssMj/ONuBUa8KDWX1zKGP4nvf2U0iTV7FDtnNamD4Syx1qHKB0O5xqxERuxEWfTwL9p7aHd0HTqXp13u+pSU3ZfL9OUDVadViM2YiM24iwa9le9fEKrkYVz6bHRJUoG4wQjNmIjNuKRafBbeknefFVVI95Eh8IH4feqqqL9mtZw3wqcY8RGbMRGPBINF75/v6DFlqrKGvGW1C/8oHxCaaT9TQ73R70RN0Ytp7Vexua1MxxOos6Ik3TDZymNtH+ll885nFaV14gbo0G+pXWkffjs7+BwUlVdI05SSfjt0PObQfsfOJxGrRE3RkNcp3Wk/TUO9UW5Efel3guUR+HaHEqj1ogboyHu0TrSfoZDfVFuxH2p9/eUR9ovcyiNWiNujIZ4TutI+685FBFno00UehNH2j/lUBq1RtwYDfGW1pH2+zgUEWejTRR6E0far3IojVojboyGeEPraMwfgDUOpVFrxI3REP/SOtJ+nN8CzzmURu3YaKhZLt0X5Ubcl3pv/CF4l0Np1I6Nhhr8q0koN+K+1PsG5ZH2ixxKo3ZsNFRb/xDaSW/T/kcOp1E7VhpsjssnUWrESep5jtJI+9daI/+Z3QoNcpW5Iu0fDRqOUiPeknrt03pKaaT94C//cdEwB7RWmS3SPjzMaOrP4T+qqor24c/hY5SUQQNdZD5T1sQDkfnY7CPKrlBSDs0V/lpbrkasKQsPM/ZSNjSdF77sez7zgbIlvXxGWVk03CGtTU+ElT3RmtPbgc/3Q41qz2r9E0/+iLLws+VLSsukAb/S6vmB9R/l4aluePQ9q+0JvcbH4ryf1bqpFf6bbBPl4cnyN1ymbBo0PB7/k9m3Tb2WtPbTfjJo4F1aF7RWuI+R6dy3WpdDL9pOHt3HEd1A+N+gF9VtDaba8I+cRa2yftVth25mt9YprXmtu1rhe3pFK3yWn2ktay3q/k9rDflbY2rqA/qKjWEv5+TsAAAAAElFTkSuQmCC'>" ).prependTo( $( ".new-memo-button" ) );


  $(
    "<img style='margin-right:3px; margin-top:-4px; width:18px;vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASESURBVHhe7dnNbhRHFMVxJ+AQAiyDBAIEUhRAeY/EVlYoYU8MTwFCYgFSlEUMGCQ/RCB5BBYOMmLBA2QTvhIhFoCQjWFhOFX9z2nGds1HuXtSI/VPKs3U6du3b/sTN1OdTqfT6XQ6nc7W3k84biMffSYWt5GPPhOL28hHn4nFbeSjjxEXizGNOB99jLhYjGnE+ehjxMViTCPORx8jLhZjGnE++hhxsRjTiPPRx4iLxZhGnI8+RlwsxjTifPQx4mIxphHno48RG7ERG3FruIwRG3E++hixERuxEbeGyxixEeejjxEbsREbcWu4jBEbcT76GLERG7ERt4bLGLER56OPEReLMY04H32MuFiMacT56GPExWJMI85HHyMuFmMacT76GLERG7ERt4bLGLER56OPERuxERtxa7iMERtxPvoYsREbsRG3Zn19fVXrsd7e0esvVVpjjHz0MWIjNmIj/t8wRj76GHHr9Nncrcv9rNd31ZXz6PzzetlJ29FVbWrErdJljmrwB9UVt0+97mkdoP1o6GHErdGgh7X+5nI9Qq51Tes7reNae1jh/YzWgtYjynsof6h1kssMj/ONuBUa8KDWX1zKGP4nvf2U0iTV7FDtnNamD4Syx1qHKB0O5xqxERuxEWfTwL9p7aHd0HTqXp13u+pSU3ZfL9OUDVadViM2YiM24iwa9le9fEKrkYVz6bHRJUoG4wQjNmIjNuKRafBbeknefFVVI95Eh8IH4feqqqL9mtZw3wqcY8RGbMRGPBINF75/v6DFlqrKGvGW1C/8oHxCaaT9TQ73R70RN0Ytp7Vexua1MxxOos6Ik3TDZymNtH+ll885nFaV14gbo0G+pXWkffjs7+BwUlVdI05SSfjt0PObQfsfOJxGrRE3RkNcp3Wk/TUO9UW5Efel3guUR+HaHEqj1ogboyHu0TrSfoZDfVFuxH2p9/eUR9ovcyiNWiNujIZ4TutI+685FBFno00UehNH2j/lUBq1RtwYDfGW1pH2+zgUEWejTRR6E0far3IojVojboyGeEPraMwfgDUOpVFrxI3REP/SOtJ+nN8CzzmURu3YaKhZLt0X5Ubcl3pv/CF4l0Np1I6Nhhr8q0koN+K+1PsG5ZH2ixxKo3ZsNFRb/xDaSW/T/kcOp1E7VhpsjssnUWrESep5jtJI+9daI/+Z3QoNcpW5Iu0fDRqOUiPeknrt03pKaaT94C//cdEwB7RWmS3SPjzMaOrP4T+qqor24c/hY5SUQQNdZD5T1sQDkfnY7CPKrlBSDs0V/lpbrkasKQsPM/ZSNjSdF77sez7zgbIlvXxGWVk03CGtTU+ElT3RmtPbgc/3Q41qz2r9E0/+iLLws+VLSsukAb/S6vmB9R/l4aluePQ9q+0JvcbH4ryf1bqpFf6bbBPl4cnyN1ymbBo0PB7/k9m3Tb2WtPbTfjJo4F1aF7RWuI+R6dy3WpdDL9pOHt3HEd1A+N+gF9VtDaba8I+cRa2yftVth25mt9YprXmtu1rhe3pFK3yWn2ktay3q/k9rDflbY2rqA/qKjWEv5+TsAAAAAElFTkSuQmCC'>"
  ).prependTo($('.new-memo-inner-button'));

  //add my-profile class
  $(`html a[href*="profile/"]`).addClass('profile-button');
  $(`table a[href*="profile/"], h2 a[href*="profile/"]`).removeClass('profile-button');

  // remove from name links
  $(
    `html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html .name a[href*="profile/"]`
  ).addClass('post-profile-button');

  $(
    "<img style='width:20px; margin-right:3px; vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUwSURBVHhe7ZpLiBxFGMfH9xsVfB2E1XW7qncxQYyIgrooaERFyVjdswlC9KCefMQgKB4mRHxMV3fWgBdPYi6a1ZtXSQ4x8aKiBzUximAiiA+IIiYL6vr/er5Nqqt73ZmdR2qkfvCxvf3/6quvqquqq2u35vF4PB6Px+PxDJ64FV4fa7k1SsVu/PwKP/8g4+vdkZZbyIfd/ycs1E6JM/lgpMWBOJULnRj5qiRYR2U5ymiitLg6TsW+qkZ2ZmJfY1ZexeFGi1gHt2FI/1zdsC5My58areBWDjsaqCycxtObLzdIzEepfBudM6NaUj6kV59HRtd0Dz47lyo3Mp1Q3xaM01OzG4HRMNfJcKZpQ752eYpZ15Nj7OYotODZc17Lv1Qqn2KPjsFCuInKmrEwej5k2U2UlspMmGwljV8k7wQrXkOHdZYdo/309xcS1vIdVleMPR3w+5csuUW+yTESReOP9eMVlq8p1sIYJcF1LLsDGry1kCRWe5Z6BvHwdjgRGx3SZMkdMF93FZLEa42lnlGJ3GDGxjT4gCV3sLe6jTQULPUMxTJjU10suQOG5e9mkve35AUs9QzFMmNTXSy5A+b8UTPJQXYA1cWSO2BY/mgmOdApkIofWHKH/Bu/kGS4nqWeKS+CYhdL7hBroc0k+7EJWqRiM9RiyR0wAm4xk6TNC33YsLxiGsnENfZGSCXhzSy7Q7NZOxWJFrfC2MCwvGIw3N+zYn7h7EkRVueHrWQX4kQ8zXLXqFQ8Y8eLdLiRZfegUYAn9lEhaXzS4t4mdukYlNtMZc1YiLOX6mAXN8lPd1J5xEy8nbycow8bdlsSlU1NYCq9a5eHHam3JgN2cxskuxZP75jVAFi+mO2kV2Q9FeHikRhd86uu+kgMsVQa3snhRwMkvhZP/bdSY7o0itFIwrs47GhBr6vKJ9qxoWwW3sThRofo1fEL8eS29GsE5LEQk8O7DTY/dyDxQ3ZD+mCH4kzeztU4CDYn2A2+jL3A3xXJYyETv+JJvkV7hZlt8ob1qbjksTfWnEFG13QPi90j5EO+VTHy2Fq85NxGKJqrnZYnXpE0Gd7f3214ZdXF7L4s5EtlqmLlpsWbVCe7n1zam5+KP2RYRpuYTjqBG7+3KkbB6GPLhZFAC1Q5OXEQCX5r34fvZ1EydQUXLUEa+djl8lgU075/sg9H4yy4B8n9YyX18To9flnemFR+XtRy/euq43K6R5rtTzEo1sxr115OsQs61Y0cOMRwiV6fOh8JHC4mJA6q7ROXskvtgdmxi+Czp+CT+8nDjdlgkt3Q+GCyFKvtt4disFuNYpdGAspRLuwyPGjFNxPBkzqqMrmK5ePc11xzLub0+6Zv28QvtPLnqz+ubZ3KUFkOc5yZRKymugq+qXiR5eHAw7uQBJ7EZpZLTDenT4fPjoJ/bnSSXDxNZttBZbh4CaXls6Y/5UJThOXBE+vweTMBGpZRc+pMlqvJ9wlytlCuwshnudWd6rKnAkbBcywPlvzkx1rhoyR4lOVlUal8wSxrGmnstixUp1kWHffNUF6LpT+C4jtdZVeew3JHYEv7ODrxxGEHXeMeyx1Bn9F4ZRa/NYbxH2ao9EmzUvw+x1JXYJGLMf/xpSjm6ZpvdwXVbeYCe4KlwWFX2s3wt1E6uJeMf+2afCSZufTxL9JLgg741KxUZcGNLA2d9nmD2QHiE5YGB208zErNjc+wae8OjQ7Q8nuWBgc64E+z0ru3T5zF0tDZ2Bw728yFcmPJ4/F4PB6Px+P5T2q1fwHtcy1yQO/6xAAAAABJRU5ErkJggg=='>"
  ).prependTo($('.name .post-profile-button'));

  //add footer-button to lower buttons
  $(
    `html a[href="/introducing-memo"], html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html a[href="/stats"], html a[href^='protocol']`
  ).addClass('footer-button');

  //add outline-button to dashboard buttons
  $(`html a[href="key/change-password"], html a[href="key/export"], html a[href="memo/set-name"]`).addClass('outline-button');


  // Add data-txhash to posts
  $(`.post .actions .like-button`).each((_, a) => {
    const $a = $(a);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0];
    $post.attr('data-txhash', txhash);
  });

  // Remove "Like Memo", which will be done by CSS instead
  $(`.post .actions .like-button`).html('');

  // Remove "Reply", which will be done by CSS instead
  $(`.post .actions .reply-button`).html('');

  // Restore likes
  $('.post[data-txhash]').each((_, post) => {
    const $post = $(post);
    const txhash = $post.attr('data-txhash');

    $post.toggleClass('is-liked', !!state.likedPosts[txhash]);
  });
}

module.exports = injectCssStateClasses;
