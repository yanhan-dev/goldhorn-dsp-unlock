import QtQuick 2.5
import QtQuick.Window 2.2
import QtQuick.Controls 1.4 as QC14
import QtQuick.Layouts 1.3
import QtQuick.Controls.Styles 1.4
import QtQuick.Controls 2.0
import QtQuick.Dialogs 1.1
import com.goldhorn.io 1.0
import com.goldhorn.ZRDownload 1.0
import com.goldhorn.ZRInstall 1.0
import Qt.labs.settings 1.0
//import com.goldhorn.QPro 1.0
import "ams.js" as Ams;
/*
author:shuaiwen, zhang jianming
*/
ApplicationWindow {
    id: root;

    function getFirmTips(){
        var firmTips;
        switch (settings.lang) {
        case "cn":
            firmTips = Ams.getTipsCN();
            break;
        case "es":
            firmTips = Ams.getTipsES();
            break;
        case "pt":
            firmTips = Ams.getTipsPT();
            break;
        case "en":
        default:
            firmTips = Ams.getTipsEN();
            break;
        }
        return firmTips;
    }

    function getFirmTips_A2B() {
        var firmTips;
        switch (settings.lang) {
        case "cn":
            firmTips = Ams.getTipsCN_A2B();
            break;
        case "es":
            firmTips = Ams.getTipsES_A2B();
            break;
        case "pt":
            firmTips = Ams.getTipsPT_A2B();
            break;
        case "en":
        default:
            firmTips = Ams.getTipsEN_A2B();
            break;
        }
        return firmTips;
    }

    property int startPos :50
    property int inputYPos :230
    property int inputXPos :10+30
    property int widthAmsAlias: 133 + 9//别名区域宽度加leftMargin=6,rightMargin=3

    readonly property var output_alias:[
        {name:qsTr("未指定别名"),passband:0}, //NOT_ASSIGNED 0
        {name:qsTr("前置左全频"),passband:0}, //FRONT_L_FULL 1
        {name:qsTr("前置右全频"),passband:0}, //FRONT_R_FULL 2
        {name:qsTr("前置左高音"),passband:1}, //FRONT_L_HIGH 3
        {name:qsTr("前置右高音"),passband:1}, //FRONT_R_HIGH 4
        {name:qsTr("前置左中音"),passband:2}, //FRONT_L_MID 5
        {name:qsTr("前置右中音"),passband:2}, //FRONT_R_MID 6
        {name:qsTr("前置左低音"),passband:3}, //FRONT_L_LOW 7
        {name:qsTr("前置右低音"),passband:3}, //FRONT_R_LOW 8
        {name:qsTr("前置中全频"),passband:0}, //FRONT_CENTER_FULL 9
        {name:qsTr("前置中高音"),passband:1}, //FRONT_CENTER_HIGH 10
        {name:qsTr("前置中低音"),passband:3}, //FRONT_CENTER_LOW 11
        {name:qsTr("前置中中音"),passband:2}, //FRONT_CENTER_MID 12
        {name:qsTr("后置左全频"),passband:0}, //REAR_L_FULL 13
        {name:qsTr("后置右全频"),passband:0}, //REAR_R_FULL 14
        {name:qsTr("后置左高音"),passband:1}, //REAR_L_HIGH 15
        {name:qsTr("后置右高音"),passband:1}, //REAR_R_HIGH 16
        {name:qsTr("后置左中音"),passband:2}, //REAR_L_MID 17
        {name:qsTr("后置右中音"),passband:2}, //REAR_R_MID 18
        {name:qsTr("后置左低音"),passband:3}, //REAR_L_LOW 19
        {name:qsTr("后置右低音"),passband:3}, //REAR_R_LOW 20
        {name:qsTr("后置中全频"),passband:0}, //REAR_CENTER_FULL 21
        {name:qsTr("后置中高音"),passband:1}, //REAR_CENTER_HIGH 22
        {name:qsTr("后置中低音"),passband:3}, //REAR_CENTER_LOW 23
        {name:qsTr("后置中中音"),passband:2}, //REAR_CENTER_MID 24
        {name:qsTr("超重低音")+"1",passband:4}, //SUBWOOFER1 25
        {name:qsTr("超重低音")+"2",passband:4}, //SUBWOOFER2 26
        {name:qsTr("超重低音")+"3",passband:4}, //SUBWOOFER3 27
        {name:qsTr("超重低音")+"4",passband:4}, //SUBWOOFER4 28
        {name:qsTr("环绕左全频"),passband:0}, //SURROUND_L_FULL 29
        {name:qsTr("环绕右全频"),passband:0}, //SURROUND_R_FULL 30
        {name:qsTr("环绕左高音"),passband:1}, //SURROUND_L_HIGH 31
        {name:qsTr("环绕右高音"),passband:1}, //SURROUND_R_HIGH 32
        {name:qsTr("环绕左中音"),passband:2}, //SURROUND_L_MID 33
        {name:qsTr("环绕右中音"),passband:2}, //SURROUND_R_MID 34
        {name:qsTr("环绕左低音"),passband:3}, //SURROUND_L_LOW 35
        {name:qsTr("环绕右低音"),passband:3}, //SURROUND_R_LOW 36
        {name:qsTr("后环绕左全"),passband:0}, //REAR_SURROUND_L_FULL 37
        {name:qsTr("后环绕右全"),passband:0}, //REAR_SURROUND_R_FULL 38
        {name:qsTr("后环绕左高"),passband:1}, //REAR_SURROUND_L_HIGH 39
        {name:qsTr("后环绕右高"),passband:1}, //REAR_SURROUND_R_HIGH 40
        {name:qsTr("后环绕左中"),passband:2}, //REAR_SURROUND_L_MID 41
        {name:qsTr("后环绕右中"),passband:2}, //REAR_SURROUND_R_MID 42
        {name:qsTr("后环绕左低"),passband:3}, //REAR_SURROUND_L_LOW 43
        {name:qsTr("后环绕右低"),passband:3}, //REAR_SURROUND_R_LOW 44
        {name:qsTr("星空左全频"),passband:0}, //STARRY_SURROUND_L_FULL 45
        {name:qsTr("星空右全频"),passband:0}, //STARRY_SURROUND_R_FULL 46
        {name:qsTr("星空左高音"),passband:1}, //STARRY_SURROUND_L_HIGH 47
        {name:qsTr("星空右高音"),passband:1}, //STARRY_SURROUND_R_HIGH 48
        {name:qsTr("星空左中音"),passband:2}, //STARRY_SURROUND_L_MID 49
        {name:qsTr("星空右中音"),passband:2}, //STARRY_SURROUND_R_MID 50
        {name:qsTr("星空左低音"),passband:3}, //STARRY_SURROUND_L_LOW 51
        {name:qsTr("星空右低音"),passband:3}, //STARRY_SURROUND_R_LOW 52

        /* 新增于20240927 */
        {name:qsTr("前天空左"),passband:8}, //53
        {name:qsTr("前天空右"),passband:8}, //54
        {name:qsTr("后天空左"),passband:8}, //55
        {name:qsTr("后天空右"),passband:8}, //56
        {name:qsTr("声浪")+"1",passband:0}, //57
        {name:qsTr("声浪")+"2",passband:0}, //58
        {name:qsTr("头枕左"),passband:5}, //59
        {name:qsTr("头枕右"),passband:5}, //60

        /* 新增高低音通道 */
        {name:qsTr("前左高低音"),passband:6}, //61
        {name:qsTr("前右高低音"),passband:6}, //62
        {name:qsTr("后左高低音"),passband:6}, //63
        {name:qsTr("后右高低音"),passband:6}, //64

        /* 新增超高音通道 */
        {name:qsTr("前左超高音"),passband:7}, //65
        {name:qsTr("前右超高音"),passband:7}, //66

        /* 新增中天空通道 */
        {name:qsTr("中天空左"),passband:8}, //67
        {name:qsTr("中天空右"),passband:8}, //68
    ];

    readonly property var devicesInfo: [
        {
            devType: Ams.AB216_D9,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: ""},
                {devTIDVersion: "1.1", devTypeRemap: "AB16", snPrefixRemap: "AB16", btName: ""},
                {devTIDVersion: "1.2", devTypeRemap: "AB16", snPrefixRemap: "AB16", btName: ""},
                {devTIDVersion: "1.3", devTypeRemap: "AB316-D9", snPrefixRemap: "AB316", btName: ""},
                {devTIDVersion: "1.4", devTypeRemap: "AB316-Li", snPrefixRemap: "AB316", btName: ""}
            ]
        },
        {
            devType: Ams.AB216_M9,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "AB2162", btName: ""},
                {devTIDVersion: "1.1", devTypeRemap: "AB22-M7", snPrefixRemap: "AB2202", btName: ""},
                {devTIDVersion: "1.2", devTypeRemap: "AB22-M9", snPrefixRemap: "AB2202", btName: ""},
                {devTIDVersion: "1.3", devTypeRemap: "AB316-M7", snPrefixRemap: "AB3162", btName: ""},
                {devTIDVersion: "1.4", devTypeRemap: "AB316-M9", snPrefixRemap: "AB3162", btName: ""},
                {devTIDVersion: "1.5", devTypeRemap: "AB22-R7", snPrefixRemap: "AB2202", btName: ""},
                {devTIDVersion: "1.6", devTypeRemap: "AB316-R7", snPrefixRemap: "AB3162", btName: ""}
            ]
        },
        {
            devType: Ams.AB216_U,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "AB2162", btName: ""},
                {devTIDVersion: "1.1", devTypeRemap: "AB22-U", snPrefixRemap: "AB2202", btName: ""},
                {devTIDVersion: "1.3", devTypeRemap: "AB316-U", snPrefixRemap: "AB3162", btName: ""},
                {devTIDVersion: "1.7", devTypeRemap: "AB328", snPrefixRemap: "AB328", btName: ""}
            ]
        },
        {
            devType: Ams.AB218_TANK,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "AB218-TANK", snPrefixRemap: "", btName: ""},
            ]
        },
        {
            devType: Ams.G2_PRO,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: ""},
                {devTIDVersion: "2.0", devTypeRemap: "P2 DSP PRO", snPrefixRemap: "P2DP", btName: ""}
            ]
        },
        {
            devType: Ams.G3_PRO,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: ""},
                {devTIDVersion: "2.0", devTypeRemap: "P3 DSP PLUS", snPrefixRemap: "P3DP", btName: ""}
            ]
        },
        {
            devType: Ams.G5,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: ""},
                {devTIDVersion: "2.0", devTypeRemap: "P5 DSP ULTRA", snPrefixRemap: "P5DU", btName: ""}
            ]
        },
        {
            devType: Ams.A5,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: Ams.A5_PRO, snPrefixRemap: "", btName: ""},
                {devTIDVersion: "2.0", devTypeRemap: "P2 DSPA PRO", snPrefixRemap: "P2DAP", btName: ""}
            ]
        },
        {
            devType: Ams.A6,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: Ams.A6_PRO, snPrefixRemap: "", btName: ""},
                {devTIDVersion: "2.1", devTypeRemap: "P3 DSPA PLUS", snPrefixRemap: "P3DAP", btName: ""}
            ]
        },
        {
            devType: Ams.A10,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: ""},
                {devTIDVersion: "2.0", devTypeRemap: "P1 DSPA", snPrefixRemap: "P1DA", btName: ""}
            ]
        },
        {
            devType: Ams.R336,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R336"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 2416 ULTRA", snPrefixRemap: "DA2416U", btName: "DSPA2416U"}
            ]
        },
        {
            devType: Ams.R316,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R316"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 1616 ULTRA", snPrefixRemap: "DA1616U", btName: "DSPA1616U"}
            ]
        },
        {
            devType: Ams.R216,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R216"},
                {devTIDVersion: "1.1", devTypeRemap: "GDT216", snPrefixRemap: "GDT216", btName: "GDT216"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 1216 PLUS", snPrefixRemap: "DA1216P", btName: "DSPA1216P"}
            ]
        },
        {
            devType: Ams.R212,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R212"},
                {devTIDVersion: "1.1", devTypeRemap: "GDT212", snPrefixRemap: "GDT212", btName: "GDT212"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 1012 PLUS", snPrefixRemap: "DA1012P", btName: "DSPA1012P"}
            ]
        },
//        {
//            devType: Ams.R210,
//            devParms:[
//                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R210"},
//                {devTIDVersion: "2.0", devTypeRemap: "DSPA 818 PRO", snPrefixRemap: "DA818P", btName: "DSPA818P"}
//            ]
//        },
        {
            devType: Ams.R28,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R28"},
                {devTIDVersion: "1.1", devTypeRemap: "GDT28", snPrefixRemap: "GDT28", btName: "GDT28"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 816 PRO", snPrefixRemap: "DA816P", btName: "DSPA816P"}
            ]
        },
        {
            devType: Ams.R68,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R68"},
                {devTIDVersion: "1.1", devTypeRemap: "GDT68PRO", snPrefixRemap: "GDT68PRO", btName: "GDT68PRO"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 810 PRO", snPrefixRemap: "DA810P", btName: "DSPA810P"}
            ]
        },
        {
            devType: Ams.R80A,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R80A"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 810 PRO V2.0", snPrefixRemap: "DA810P", btName: "DSPA810P"}
            ]
        },
        {
            devType: Ams.GDT216,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT216"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 1216 PLUS", snPrefixRemap: "DA1216P", btName: "DSPA1216P"}
            ]
        },
        {
            devType: Ams.GDT212,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT212"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 1012 PLUS", snPrefixRemap: "DA1012P", btName: "DSPA1012P"}
            ]
        },
        {
            devType: Ams.GDT28,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT28"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 816 PRO", snPrefixRemap: "DA816P", btName: "DSPA816P"}
            ]
        },
        {
            devType: Ams.GDT68PRO,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT68PRO"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 810 PRO", snPrefixRemap: "DA810P", btName: "DSPA810P"}
            ]
        },
        {
            devType: Ams.GD16,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GD16"},
                {devTIDVersion: "2.0", devTypeRemap: "DSP16 ULTRA", snPrefixRemap: "DSP16U", btName: "DSP16ULTRA"}
            ]
        },
        {
            devType: Ams.GD12,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GD12"},
                {devTIDVersion: "2.0", devTypeRemap: "DSP12 PRO", snPrefixRemap: "DSP12P", btName: "DSP12PRO"}
            ]
        },
        {
            devType: Ams.GD10,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GD10"},
                {devTIDVersion: "2.0", devTypeRemap: "DSP10", snPrefixRemap: "DSP10", btName: "DSP10"}
            ]
        },
        {
            devType: Ams.GDT66,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT66"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 608", snPrefixRemap: "DA608", btName: "DSPA608"}
            ]
        },
        {
            devType: Ams.GDT42,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT42"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 406", snPrefixRemap: "DA406", btName: "DSPA406"}
            ]
        },
        {
            devType: Ams.GDT42A,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT42A"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 406 V2.0", snPrefixRemap: "DA406", btName: "DSPA406"}
            ]
        },
        {
            devType: Ams.GDT08,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT08"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 810 SE", snPrefixRemap: "DA810SE", btName: "DSPA810SE"}
            ]
        },
        {
            devType: Ams.R68A,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "R68A"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 810 SE V2.0", snPrefixRemap: "DA810SE", btName: "DSPA810SE"}
            ]
        },
        {
            devType: Ams.GDT06,
            devParms:[
                {devTIDVersion: "1.0", devTypeRemap: "", snPrefixRemap: "", btName: "GDT06"},
                {devTIDVersion: "2.0", devTypeRemap: "DSPA 206", snPrefixRemap: "DA206", btName: "DSPA206"}
            ]
        }
    ]

    function getDemoRealDeviceType(remapedDevType) {
        if (Ams.isForCDT() && (remapedDevType == Ams.GDT216 || remapedDevType == Ams.GDT212 || remapedDevType == Ams.GDT68PRO || remapedDevType == Ams.GDT28)) { //针对韩国CDT版R系列未备案的的特殊处理
            return remapedDevType;
        }

        for (var i = 0; i < root.devicesInfo.length; i++) {
            for (var j = root.devicesInfo[i].devParms.length - 1; j > -1; j--) {
                if (root.devicesInfo[i].devParms[j].devTypeRemap === remapedDevType) {
                    return root.devicesInfo[i].devType;
                }
            }
        }

        return remapedDevType;
    }

    function isAcceptedDeviceType(devType)
    {
        var curAcceptedDeviceTypeList = Ams.getAcceptedDeviceTypeList();
        for (var i = 0; i < curAcceptedDeviceTypeList.length; i++) {
            if (getRemapDeviceType(devType) == curAcceptedDeviceTypeList[i]) {
                return true;
            }
        }

        return false;
    }

    function getRemapDeviceType(devType) {
        var devParm = null;
        var curDeviceType = devType;
        if (devType == null) {
            curDeviceType = Ams.getDeviceType();
        }

        for (var i = 0; i < root.devicesInfo.length; i++) {
            if (root.devicesInfo[i].devType === curDeviceType) {
                var devParms = root.devicesInfo[i].devParms;

                for (var j = 0; j < devParms.length; j++) {
                    if (Ams.getCurDevTID(curDeviceType).lastIndexOf(devParms[j].devTIDVersion) > -1) {
                        if (devParms[j].devTypeRemap.length > 0) {
                            return devParms[j].devTypeRemap;
                        } else {
                            break;
                        }
                    }
                }

                break;
            }
        }

        return curDeviceType;
    }

    function getRemapDeviceSN(sn) {
        var curDeviceType = Ams.getDeviceType();
        var curDeviceSN = Ams.getDeviceSN();
        if (sn != null) {
            curDeviceSN = sn;
        }

        if (curDeviceSN.length > 0) {
            for (var i = 0; i < root.devicesInfo.length; i++) {
                if (root.devicesInfo[i].devType === curDeviceType) {
                    var devParms = root.devicesInfo[i].devParms;

                    for (var j = 0; j < devParms.length; j++) {
                        if (Ams.getCurDevTID(curDeviceType).lastIndexOf(devParms[j].devTIDVersion) > -1) {
                            if (devParms[j].snPrefixRemap.length > 0) {
                                return Ams.getPrefixRemapSN(curDeviceSN, devParms[j].snPrefixRemap);
                            } else {
                                break;
                            }
                        }
                    }

                    break;
                }
            }
        }

        return curDeviceSN;
    }

    function getDeviceSNForVerify() {
        if (Ams.getDeviceType().indexOf("AB216") == 0) {
            return root.getRemapDeviceSN();
        } else {
            return Ams.getDeviceSN();
        }
    }

    function getOutputAliasName(idx)
    {
        try {
            return output_alias[idx].name;
        } catch (e) {
            console.error("Exception: getOutputAliasName fail!");
            return "";
        }
    }

    function getInputAliasName(idx)
    {
        try {
            var name = output_alias[idx].name;
//            switch (idx) {
//            case 1:
//                name = qsTr("F.L.Full");
//                break;
//            case 2:
//                name = qsTr("F.R.Full");
//                break;
//            case 15:
//                name = qsTr("R.L.Full");
//                break;
//            case 16:
//                name = qsTr("R.R.Full");
//                break;
//            }
            return name;
        } catch (e) {
            console.error("Exception: getInputAliasName fail!");
            return "";
        }
    }

    function getOutputAliasPassband(idx)
    {
        try {
            return output_alias[idx].passband;
        } catch (e) {
            console.error("Exception: getOutputAliasPassband fail!");
            return 0;
        }
    }


    property var  outputs_name:[qsTr("输出")+"A",qsTr("输出")+"B",qsTr("输出")+"C",qsTr("输出")+"D",qsTr("输出")+"E",qsTr("输出")+"F",qsTr("输出")+"G",qsTr("输出")+"H",qsTr("输出")+"I",qsTr("输出")+"J",qsTr("输出")+"K",qsTr("输出")+"L"
        ,qsTr("输出")+"M",qsTr("输出")+"N",qsTr("输出")+"O",qsTr("输出")+"P"/*,qsTr("输出")+"Q",qsTr("输出")+"R",qsTr("输出")+"S",qsTr("输出")+"T",qsTr("输出")+"U",qsTr("输出")+"V",qsTr("输出")+"W",qsTr("输出")+"X"*/];

    property var real_outputs_name: [];

    function getOutputName(idx)
    {
        //return real_outputs_name.length==0?outputs_name[idx]:real_outputs_name[idx];
        if (idx < Ams.DspCfgData.length) {
            return outputs_name[idx];
        } else {
            return outputs_name[idx - Ams.DspCfgData.length];
        }
    }

    function getOutputNameWithNumber(idx)
    {
        return (qsTr("输出") + (idx + 1));
    }

    function getRemapedOutputName(idx)
    {
        var retName;

        if (Ams.getDeviceType() == Ams.R336 && Ams.getOutputCmdLineIdxByViewIdx(idx) >= 16) {
            retName = root.getOutputNameWithNumber(Ams.getOutputCmdLineIdxByViewIdx(idx) - 16);
        } else if (Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK) {
            if (Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1) {
                retName = root.getOutputNameWithNumber(idx);
            } else if (Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_2) {
                retName = root.getOutputNameWithNumber(idx + 16);
            } else {
                retName = root.getOutputName(Ams.getDSPId(idx/*Ams.getOutputCmdLineIdxByViewIdx(idx)*/));
            }
        } else if (Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U) {
            retName = root.getOutputNameWithNumber(Ams.getOutputCmdLineIdxByViewIdx(idx) - Ams.getUniversalOutputsLength());
        } else if (Ams.getDeviceType() === Ams.GDT42A || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A || Ams.getDeviceType() === Ams.P1_DSP || Ams.getDeviceType() === Ams.G1_PRO) {
            retName = root.getOutputNameWithNumber(Ams.getOutputCmdLineIdxByViewIdx(idx));
        } else if (Ams.getDeviceType() === Ams.R216A) {
            retName = root.getOutputNameWithNumber(/*Ams.getOutputCmdLineIdxByViewIdx*/(idx));
        } else {
            retName = root.getOutputName(Ams.getDSPId(idx/*Ams.getOutputCmdLineIdxByViewIdx(idx)*/));
        }

        return retName;
    }

//    function getOutputNames()//getDSPId(id)
//    {
////    return outputs_name;
//        return real_outputs_name.length==0?outputs_name:real_outputs_name;
//    }

    /* 获取数字输入源名称 */
    function getDigitalInputName(routing, idx, lang)
    {
        var retName = qsTr("数字");

        switch (routing) {
        case Ams.DIGITAL:
            if ((!Ams.isHasSpdifRoute() || Ams.getDeviceType() == Ams.G2_PRO || Ams.getDeviceType() == Ams.G3_PRO || Ams.getDeviceType() == Ams.G5 || Ams.getDeviceType() == Ams.P1_DSP || Ams.getDeviceType() == Ams.G1_PRO)) {
                retName = qsTr("主机")
                break;
            }
        case Ams.SPDIF:
            if (Ams.getCurrentDigitalSrcType() == Ams.DIGITAL_SRC_TYPE_FIBER) {
                retName = qsTr("光纤");
            } else if (Ams.getCurrentDigitalSrcType() == Ams.DIGITAL_SRC_TYPE_AXIS) {
                retName = qsTr("同轴");
            }
            break;
        case Ams.BLUETOOTH:
            retName = qsTr("蓝牙");
            break;
        case Ams.SOUNDCARD:
            retName = "USB";
            break;
        case Ams.A2B:
            retName = "A2B";
            break;
//        case KARAOKE:
//            //TODO
//            break;
        }

        retName += (lang=="cn"?"":" ");
        retName += ((idx % 2)?qsTr("右"):qsTr("左"));

        return retName;
    }

    function getA2BAliasName(inputIdx, isLimitedSpace) {
        var aliasName = Ams.getCarModelA2BSrcName(inputIdx, settings.lang, isLimitedSpace);
        if (aliasName.length < 1) {
            //aliasName = "A2B " + (inputIdx + 1);
            aliasName = qsTr("空");
        }

        return aliasName;
    }

    /* 获取真正发往设备端的DTS输入源下标 */
    function getDemappedDtsInputIdx(mappedIdx) {
        var demappedIdx = mappedIdx;

        if (Ams.isVSRxSeriesDevice()) {
            if ((!Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "5.1") || (Ams.isDtsEnabled() && Ams.getDtsOutputTypeName() === "5.1")) {
                switch (mappedIdx) {
                case 2: //左环绕
                    demappedIdx = 6;
                    break;
                case 3: //右环绕
                    demappedIdx = 7;
                    break;
                case 6: //后左环绕
                    demappedIdx = 2;
                    break;
                case 7: //后右环绕
                    demappedIdx = 3;
                    break;
                }
            }
        } else {
            if (Ams.getDtsOutputTypeName() === "5.1") {
                switch (mappedIdx) {
    //            case 0: //前置左
                case 1: //中置
                    demappedIdx = 4;
                    break;
                case 2: //前置右
                    demappedIdx = 1;
                    break;
                case 3: //左环绕
                    demappedIdx = 2;
                    break;
                case 4: //右环绕
                    demappedIdx = 3;
                    break;
                case 5: //超重低音
                    demappedIdx = 5;
                    break;
                }
            } else if (Ams.getDtsOutputTypeName() === "6.1") {
                switch (mappedIdx) {
    //            case 0: //前置左
                case 1: //中置
                    demappedIdx = 4;
                    break;
                case 2: //前置右
                    demappedIdx = 1;
                    break;
                case 3: //左环绕
                    demappedIdx = 2;
                    break;
                case 4: //右环绕
                    demappedIdx = 3;
                    break;
                case 5: //后中置
                    demappedIdx = 6;
                    break;
                case 6: //超重低音
                    demappedIdx = 5;
                    break;
                }
            } else if (Ams.getDtsOutputTypeName() === "7.1") {
                switch (mappedIdx) {
    //            case 0: //前置左
                case 1: //中置
                    demappedIdx = 4;
                    break;
                case 2: //前置右
                    demappedIdx = 1;
                    break;
                case 3: //左环绕
                    demappedIdx = 2;
                    break;
                case 4: //右环绕
                    demappedIdx = 3;
                    break;
                case 5: //后左环绕
                    demappedIdx = 6;
                    break;
                case 6: //后右环绕
                    demappedIdx = 7;
                    break;
                case 7: //超重低音
                    demappedIdx = 5;
                    break;
                }
            }
        }

        return demappedIdx;
    }

    function getDtsInputName(demappedIdx) {
        var objInputName = null; //{名称，缩写}
        switch (demappedIdx) {
        case 0:
            if (Ams.isVSRxSeriesDevice() && !Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "2.0") {
                objInputName = {name:qsTr("左声道"), abName:"L"};
            } else {
                objInputName = {name:qsTr("前置左"), abName:"F.L"};
            }
            break;
        case 1:
            if (Ams.isVSRxSeriesDevice() && !Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "2.0") {
                objInputName = {name:qsTr("右声道"), abName:"R"};
            } else {
                objInputName = {name:qsTr("前置右"), abName:"F.R"};
            }
            break;
        case 2:
            if (Ams.isVSRxSeriesDevice() && ((!Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "5.1") || (Ams.isDtsEnabled() && Ams.getDtsOutputTypeName() === "5.1"))) {
                objInputName = {name:qsTr("后左环绕"), abName:"R.S.L"};
            } else {
                objInputName = {name:qsTr("左环绕"), abName:"S.L"};
            }
            break;
        case 3:
            if (Ams.isVSRxSeriesDevice() && ((!Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "5.1") || (Ams.isDtsEnabled() && Ams.getDtsOutputTypeName() === "5.1"))) {
                objInputName = {name:qsTr("后右环绕"), abName:"R.S.R"};
            } else {
                objInputName = {name:qsTr("右环绕"), abName:"S.R"};
            }
            break;
        case 4:
            objInputName = {name:qsTr("中置"), abName:"F.C"};
            break;
        case 5:
            objInputName = {name:qsTr("超重低音"), abName:"S.W"};
            break;
        case 6:
            if (Ams.isVSRxSeriesDevice() && ((!Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "5.1") || (Ams.isDtsEnabled() && Ams.getDtsOutputTypeName() === "5.1"))) {
                objInputName = {name:qsTr("左环绕"), abName:"S.L"};
            } else {
                if (Ams.getDtsOutputTypeName() === "6.1") {
                    objInputName = {name:qsTr("后中置"), abName:"B.C"};
                } else {
                    objInputName = {name:qsTr("后左环绕"), abName:"R.S.L"};
                }
            }
            break;
        case 7:
            if (Ams.isVSRxSeriesDevice() && ((!Ams.isDtsEnabled() && Ams.getDsdOutputTypeName() === "5.1") || (Ams.isDtsEnabled() && Ams.getDtsOutputTypeName() === "5.1"))) {
                objInputName = {name:qsTr("右环绕"), abName:"S.R"};
            } else {
                objInputName = {name:qsTr("后右环绕"), abName:"R.S.R"};
            }
            break;
        }

        return objInputName;
    }

    function getSurroundInputName(demappedIdx) {
        var objInputName = null; //{名称，缩写}
        if (Ams.getSurroundSrcLength() === 2) {
            switch (demappedIdx) {
            case 0:
                objInputName = {name:qsTr("左环绕"), abName:"S.L"};
                break;
            case 1:
                objInputName = {name:qsTr("右环绕"), abName:"S.R"};
                break;
            }
        } else if (Ams.getSurroundSrcLength() === 6) {
            switch (demappedIdx) {
            case 0:
                objInputName = {name:qsTr("前置左"), abName:"F.L"};
                break;
            case 1:
                objInputName = {name:qsTr("前置右"), abName:"F.R"};
                break;
            case 2:
                objInputName = {name:qsTr("中置"), abName:"F.C"};
                break;
            case 3:
                objInputName = {name:qsTr("左环绕"), abName:"S.L"};
                break;
            case 4:
                objInputName = {name:qsTr("右环绕"), abName:"S.R"};
                break;
            case 5:
                objInputName = {name:qsTr("超重低音"), abName:"S.W"};
                break;
            }
        } else {
            switch (demappedIdx) {
            case 0:
                objInputName = {name:qsTr("前置左"), abName:"F.L"};
                break;
            case 1:
                objInputName = {name:qsTr("前置右"), abName:"F.R"};
                break;
            case 2:
                objInputName = {name:qsTr("前左环绕"), abName:"F.S.L"};
                break;
            case 3:
                objInputName = {name:qsTr("前右环绕"), abName:"F.S.R"};
                break;
            case 4:
                objInputName = {name:qsTr("后左环绕"), abName:"R.S.L"};
                break;
            case 5:
                objInputName = {name:qsTr("后右环绕"), abName:"R.S.R"};
                break;
            case 6:
                objInputName = {name:qsTr("中置"), abName:"F.C"};
                break;
            case 7:
                objInputName = {name:qsTr("超重低音"), abName:"S.W"};
                break;
            }
        }

        return objInputName;
    }

    function getCarSubModelNameWithVersion() {
        var desString = Ams.getCarSubModelName(settings.lang);
        if (desString.length > 0) {
            if (Ams.getA2BInitCorrect() === 1) { //已主动识别
                if (Ams.getA2BSubModelVersion() > 0) {
                    desString += " V" + Ams.getA2BSubModelVersion();
                }
            } else if (Ams.getA2BInitCorrect() === 2) { //已自动识别
                desString += "(" + qsTr("自动") + ")";
            }
        }

        return desString;
    }

    function initArray(nameSize,aliasSize){
        var pairedCh;
        var i,ii;
        real_outputs_name=[];
        //sf.enableAll(false);
        for(i=0; i<nameSize; i++) {
            //real_outputs_name.push(outputs_name[i]);
            rep_outgrp.updIdx(i,true,true);
            grahp_frame.updIdx(i,true,true);
            //reset_win.updIdx(i,true,true);
            //sf.updateEnable(i,true,true);
//            console.log("----nameSize----"+real_outputs_name[i]);

//            pairedCh = Ams.getPairedBridgeJointChannel(Ams.getOutputCmdLineIdxByViewIdx(i));
//            if (pairedCh > -1 && (pairedCh === i + 1)) {
//                real_outputs_name.push(outputs_name[pairedCh]);
//                rep_outgrp.updIdx(pairedCh,false,true);
//                grahp_frame.updIdx(pairedCh,false,true);
//                reset_win.updIdx(pairedCh,false,true);
//                sf.updateEnable(pairedCh,false,true);

//                i = pairedCh;
//            }
        }
        var visibleEndIndex = ((nameSize > 0) ? nameSize : Ams.getOutputsLength()) - 1;
        for(ii=nameSize;ii<outputs_name.length;ii++){
            rep_outgrp.updIdx(ii,false,ii > visibleEndIndex ? false: true);
            grahp_frame.updIdx(ii,false,true);
            //reset_win.updIdx(ii,false,false);
            //sf.updateEnable(ii,false,true);
        }

        /* 对“时间”界面的特殊处理 */
        sf.enableAll(false);
        for (i = 0; i < Ams.getOutputsLength(); i++) {
            sf.updateEnable(i,true,true);
        }
//        if (Ams.getIndepAmpOutputsLength() > 0) {
//            var allVisibleOutputsLength = Ams.getAllIndepOutputsLength();
//            for(; i < allVisibleOutputsLength; i++) {
//                sf.updateEnable(i,true,true);
//            }
//            sf.showTabBar = true;
//        } else {
//            sf.showTabBar = false;
//        }
        sf.showTabBar = (Ams.getIndepAmpOutputsLength() > 0 ? (Ams.getUniversalOutputsLength() > 0 ? true : Ams.getIndepAmpOutputsLength() > 16) : false);
        sf.showGroupOfRCA = (Ams.getUniversalOutputsLength() > 0 ? true : false);
        sf.splitGroupOfAMP = (Ams.getIndepAmpOutputsLength() > (16 - Ams.getSharedChannelsLength()) ? true : false);
    }

    /* 识别设备并显示弹窗或进入数据同步 */
    function identifyDevice() {
        //设置固件路径
        setFirmWarePath();

        if (!hidIO.isLoadMode()) {
            //本地固件版本比较
            getFirm();
            if (dev_state.isIdentified || (Ams.isDebug || Ams.isDemoMode())) {
                sf.updateView(-1); //刷新“关于”界面（要在configDsp(true)后调用，否则不显示主车型名称）
                busyView.hide();

                var strTip = "";
                if (Ams.isHasA2BRoute() && sf.isCurrentA2BPredefinedDataInfoChanged()) {
                    /* 刷新界面 */
                    Ams.adaptCarModelA2BPredefinedData(); //适配当前车型的A2B预设源配置
                    car_model_settings_win.refreshModel(); //更新当前车型分组及车型列表
                    io.setView(Ams.getDeviceType(), true);
                    io.updateTabOfA2BInputs();

                    strTip = qsTr("已更新A2B配置！");
                }
                if (Ams.isDebug || Ams.isDemoMode()) {
                    strTip += qsTr("未连接设备！");
                } else {
                    if (sf.isHasUpgradeableFirmware()) {
                        strTip += qsTr("发现新固件！");
                    } else {
                        strTip += qsTr("未发现新固件！");
                    }
                }

                if (strTip.length > 0) {
                    toast.show(strTip);
                }
            } else {
                openDia();
            }
        }
    }

    function startGetVersionInfo(timeout) {
        if (timeout != undefined) {
            timer2_httpRequestTimeout.interval = timeout;
        } else {
            timer2_httpRequestTimeout.interval = 10000; //默认10秒超时
        }
        timer_get_version_info.start();
    }

    function startGetIP() {
        timer_main.timerHandler = timer_main.callbackOfStartGetIP;
        timer_main.start();
    }

    function requestFromMyServer(cmd, data, responseCallBack) {
        if (Ams.isDebug || !Ams.isDeviceInfoSaved()) {
            return;
        }

        var fullUrl = "https://www.china-gehang.com.cn/if/DSP/" + cmd + ".php?";
//        console.log("Request: " + fullUrl);
//        console.log("POST: data=" + qaesencryption.encode(data));
//        console.log("MingWen: data=" + data);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
//            try {
//                console.log("requestFromMyServer onreadystatechange: readyState = " + xhr.readyState + ", xhr.status = " + xhr.status);
//            } catch (e) {
//                console.log("requestFromMyServer onreadystatechange: readyState = " + xhr.readyState);
//            }

            if (xhr.readyState === XMLHttpRequest.DONE) {
                timer_httpRequestTimeout.stop();

                try {
                    if (xhr.status !== 200 && xhr.status !== 0) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.show(qsTr("网络连接出错！正在重试，请保持网络畅通...") + "(" + qsTr("错误码：") + xhr.status + ")");
                        }
                        xhr.abort(); //主动断开连接
                        timer_main.isLastestRequestFailed = true;
                        root.startGetIP(); //重启获取IP流程
                        return;
                    }
                } catch (e) {
                    console.log("requestFromMyServer Error: readyState = " + xhr.readyState);
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接出错！正在重试，请保持网络畅通..."));
                    }
                    xhr.abort(); //主动断开连接
                    timer_main.isLastestRequestFailed = true;
                    root.startGetIP(); //重启获取IP流程
                    return;
                }

//                if (xhr.status === 200) {
//                    console.log("requestFromMyServer responseText: " + xhr.responseText);
//                    console.log("MingWen: " + qaesencryption.decode(xhr.responseText));
//                }
                responseCallBack(xhr.status === 200 ? qaesencryption.decode(xhr.responseText) : "", xhr.status, timer_httpRequestTimeout.isRequestAborted);

                xhr.abort(); //主动断开连接
            }
        }
        xhr.open("POST", fullUrl, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("data=" + qaesencryption.encode(data));
        timer_httpRequestTimeout.startForHandler(xhr);
    }

    function requestFromOutside(url, urlToken, responseCallBack) {
        if (Ams.isDebug || !Ams.isDeviceInfoSaved()) {
            return;
        }

        //console.log("Request: " + url);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
//            try {
//                console.log("requestFromOutside onreadystatechange: readyState = " + xhr.readyState + ", xhr.status = " + xhr.status);
//            } catch (e) {
//                console.log("requestFromOutside onreadystatechange: readyState = " + xhr.readyState);
//            }

            if (xhr.readyState === XMLHttpRequest.DONE) {
                timer_httpRequestTimeout.stop();
                responseCallBack(xhr.status === 200 ? xhr.responseText : "", xhr.status, timer_httpRequestTimeout.isRequestAborted);
                xhr.abort(); //主动断开连接
            }
        }
        xhr.open("GET", url, true);
        if (/*urlToken != null && 加此条件闪退？！ */urlToken.length > 0) {
            xhr.setRequestHeader("token", urlToken);
        }
        xhr.send();
        timer_httpRequestTimeout.startForHandler(xhr);
    }

    function requestVersionInfoFromMyServer(name, responseCallBack) {
        if ((Ams.isDebug && !Ams.isHasA2BRoute())/* || !dev_state.isConnected*/) {
            return;
        }

        var fullUrl = zr_download.getUrl(name);
//        console.log("Request: " + fullUrl);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
//            try {
//                console.log("requestVersionInfoFromMyServer onreadystatechange: readyState = " + xhr.readyState + ", xhr.status = " + xhr.status);
//            } catch (e) {
//                console.log("requestVersionInfoFromMyServer onreadystatechange: readyState = " + xhr.readyState);
//            }

            if (xhr.readyState === XMLHttpRequest.DONE) {
                //Ams.printCurrentTime();
                timer2_httpRequestTimeout.stop();

//                try {
//                    if (xhr.status !== 200 && xhr.status !== 0 && xhr.status !== 404) {
////                        var needRetry = false;
////                        if (xhr.status == 404) { //版本信息文件不存在
////                            if (Ams.isHasA2BRoute()) { //支持A2B源的型号必须继续尝试获取
////                                needRetry = true;
////                                busyView.show(qsTr("获取版本信息失败！") + qsTr("请重新连接设备再试。"));
////                            }
////                        } else {
////                            needRetry = true;
//                            busyView.show(qsTr("网络连接出错！正在重试，请保持网络畅通...") + "(" + qsTr("错误码：") + xhr.status + ")");
////                        }

////                        if (needRetry) {
//                            xhr.abort(); //主动断开连接
//                            timer_get_version_info.isLastestRequestFailed = true;
//                            root.startGetVersionInfo(); //重启获取云端设备固件、A2B固件等的版本信息
//                            return;
////                        }
//                    }
//                } catch (e) {
////                    console.log("requestVersionInfoFromMyServer Error: readyState = " + xhr.readyState);
//                    busyView.show(qsTr("网络连接出错！正在重试，请保持网络畅通..."));
//                    xhr.abort(); //主动断开连接
//                    timer_get_version_info.isLastestRequestFailed = true;
//                    root.startGetVersionInfo(); //重启获取云端设备固件、A2B固件等的版本信息
//                    return;
//                }

//                if (xhr.status === 200) {
//                    console.log("requestVersionInfoFromMyServer responseText: " + xhr.responseText);
//                } else if (xhr.status === 404) {
//                    console.log("requestVersionInfoFromMyServer: Can not found version info.");
//                }
                responseCallBack(xhr.status === 200 ? xhr.responseText : "", xhr.status, timer2_httpRequestTimeout.isRequestAborted);

                xhr.abort(); //主动断开连接
            }
        }
        xhr.open("GET", fullUrl, true);
        xhr.send();
        //Ams.printCurrentTime();
        timer2_httpRequestTimeout.startForHandler(xhr);
    }

    property string prefixTitle: "GOLDHORN DSP " + Ams.getSoftVer() + "(" + Ams.getSoftCode() + ")"
    title: prefixTitle + (Ams.isForFactoryTest() ? qsTr("（车间测试专用）") : "")
    visibility :Window.Hidden
    width:1320
    height: 680 //630
//	width: Screen.desktopAvailableWidth - 10 - 10
//    height: Screen.desktopAvailableHeight - 30 -10
    //	maximumWidth: Screen.desktopAvailableWidth//不能设置最大尺寸，否则最大化按钮会被Disable
//    maximumHeight: Screen.desktopAvailableHeight
    minimumWidth:1320
    minimumHeight: 680
//    x: (Screen.desktopAvailableWidth - width) / 2
//    y: (Screen.desktopAvailableHeight - height) / 2
    x: 0
    y: 0
    property alias dig_idx: bar_routings.currentIndex
    signal gotIP(string IP); //获取到IP的信号
    signal noNeedIP(); //无需获取IP的信号
    signal reboot() //this signal is handled by main.cpp and will be called once language is changed.



    color: "#0f181f"//"#000000"
    property bool isSetting: (stacks.currentIndex > 1 && stacks.currentIndex != 4) ? true : false;
    Component.onCompleted: {
        if (Ams.isForCDT()) {
            if (Ams.getAcceptedDeviceTypeList() == Ams.DEVICE_TYPE_LIST_STANDARD) {
                prefixTitle = "CDT DSP Standard Toolkits";
            } else if (Ams.getAcceptedDeviceTypeList() == Ams.DEVICE_TYPE_LIST_PRO) {
                prefixTitle = "CDT DSP Pro Toolkits";
            } else {
                prefixTitle = "CDT DSP Toolkits";
            }
        }

        /* 存在多屏幕时在主屏幕居中 */
        x = (Math.min(Screen.desktopAvailableWidth, Screen.width) - width) / 2; //其中的Math.min(...)语句是针对存在多个屏幕的情况，取其中较小的值作为水平居中依据
        y = (Math.min(Screen.desktopAvailableHeight, Screen.height) - height) / 2; //其中的Math.min(...)语句是针对存在多个屏幕的情况，取其中较小的值作为垂直居中依据

        /* 高低通滤波器模板初始化 */
        console.log("load ApplicationWindow completed");
        console.log("Screen.desktopAvailableWidth=" + Screen.desktopAvailableWidth);
        //Ams.printCurrentTime();
        var filter1 =cfgFile.readFile(":/filter.js");
        Ams.fixedTapeData=JSON.parse(filter1)
        var filter2=cfgFile.readFile(":/filter2.js");
        Ams.linkeFixedTapeData1=JSON.parse(filter2)
//        Ams.finshed=true;
//        Ams.fixedTapeData=Fil.fixedTapeData;
//        Ams.linkeFixedTapeData1=Fil.linkeFixedTapeData1;

//        if (Ams.isDebug) {
//            Ams.setDemoModeEnabled(true);
//            Ams.saveDeviceInfo(Ams.GD16, "0GD16000T749000000", "1.0.0", "1.0.0", "1.0.0", "10258");
//            demoReset();
//        }

        //doCalcMargin();
    }

    Timer {
        Component.onCompleted: {
            console.log("timer_main: load completed")

//            if (!Ams.isDebug) {
//                busyView.show(qsTr("正在进行设备验证，请保持网络畅通..."));
//            }

            start();
        }
        id:timer_main
        interval : 1
        repeat: false
        triggeredOnStart: true
        property var timerHandler: callbackOfFirstStart
        property bool isLastestRequestFailed: false //最近一次的网络连接是否失败

        onTriggered:
        {
            stop();
            timerHandler();
        }

        /* 首次启动 */
        function callbackOfFirstStart() {
            console.log("timer_main: first onTriggered completed")
            root.visibility = Window.Minimized //先最小化一次，保证窗口显示出来后能弹出至顶层
            //root.visibility=Window.AutomaticVisibility;
            root.visibility=Window.Maximized;
            console.log("width=" + root.width)
            console.log("height=" + root.height)
            root.maximumWidth = root.width
            root.maximumHeight = root.height
            root.minimumWidth = root.width
            root.minimumHeight = root.height
            root.flags = root.flags & ~Qt.WindowMaximizeButtonHint;

            doCalcMargin();
            io.doCalcMargin();

            /* 设置参数，等待开始获取IP流程 */
            //triggeredOnStart = false;
            //interval = 1000;
            //root.startGetIP(); //开启获取IP流程
        }
        function callbackOfStartGetIP() {
            timer_main.triggeredOnStart = false; //设置下次调用为非启动触发

            //console.log();
            //Ams.printCurrentTime();
            //console.log(">>>>>>>>>>>>>>>>Step1: Get url for query IP...");
            Ams.setCurrentIP(""); //清空现有IP信息
            if (Ams.isDeviceInfoSaved()) {
                root.requestFromMyServer("queryURL", "queryURL=queryURL" + (root.getDeviceSNForVerify().length > 0 ? ("&deviceNo=" + root.getDeviceSNForVerify()) : ""), callbackOfQueryUrl); //获取查询IP所需的url
            } else {
                root.requestFromMyServer("queryURL", "queryURL=queryURL", callbackOfQueryUrl); //获取查询IP所需的url
            }
        }

        function callbackOfQueryUrl(responseText, status, isRequestAborted) {
            //console.log("callbackOfQueryUrl Response: " + responseText);
            if (status === 0) {
                timer_main.isLastestRequestFailed = true;
                if (isRequestAborted) {
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接超时，请检查网络是否畅通..."));
                    }
                } else {
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接失败，请检查网络是否畅通..."));
                    }
                }
                root.startGetIP(); //重启获取IP流程
                return;
            }
            try {
                var responseJSON = JSON.parse(responseText);
                if (responseJSON.result != null) {
                    if (responseJSON.deviceNo == null || responseJSON.result.indexOf("missing ") === 0) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        return;
                    } else if (responseJSON.deviceNo !== root.getDeviceSNForVerify()) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备序列号不匹配！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        return;
                    }

                    if (timer_main.isLastestRequestFailed) {
                        timer_main.isLastestRequestFailed = false;
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.show(qsTr("正在进行设备验证，请保持网络畅通...")); //刷新一次提示，以免网络由断开转为恢复时仍提示断开的情况
                        }
                    }

                    switch (responseJSON.result) {
                    case "OK":
                    case "ok":
                        if (responseJSON.tracert1 != null) { //一次追踪
                            qTracert.argusTracert1 = responseJSON.tracert1;
                            qTracert.isNeedTracert1 = true;
                        } else {
                            qTracert.isNeedTracert1 = false;
                        }
                        if (responseJSON.tracert2 != null) { //二次追踪
                            qTracert.argusTracert2 = responseJSON.tracert2;
                            qTracert.isNeedTracert2 = true;
                        } else {
                            qTracert.isNeedTracert2 = false;
                        }
                        if (responseJSON.routePrint != null) { //路由表打印
                            qTracert.argusRoutePrint = responseJSON.routePrint;
                            qTracert.isNeedRoutePrint = true;
                        } else {
                            qTracert.isNeedRoutePrint = false;
                        }
                        if (responseJSON.ipconfig != null) { //网络适配器查询
                            qTracert.argusIpconfig = responseJSON.ipconfig;
                            qTracert.isNeedIpconfig= true;
                        } else {
                            qTracert.isNeedIpconfig = false;
                        }
                        if (responseJSON.URL != null) {
                            Ams.QueryUrlOfIP = responseJSON.URL;

                            var token = "";
                            if (responseJSON.token != null) {
                                token = responseJSON.token;
                            }

                            //console.log();
                            //Ams.printCurrentTime();
                            //console.log(">>>>>>>>>>>>>>>>Step2: Query IP by url...");
                            root.requestFromOutside(responseJSON.URL, token, callbackOfTouchIP); //用从服务端获取的url查询IP
                        }
                        break;
                    case "NONEEDIP": //无需获取IP
                        root.noNeedIP();
                        break;
                    case "refuse":
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备验证未通过！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        break;
                    default:
                        root.startGetIP(); //重启获取IP流程
                        break;
                    }
                } else {
                    //console.log("callbackOfQueryUrl Error: responseText = " + responseText);
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                    }
                }
            } catch (e) {
                //console.log("callbackOfQueryUrl Error: Call JSON.parse(...) fail, responseText = " + responseText);
                if (Ams.isNeedVerifyDevice()) {
                    busyView.modalShow(qsTr("设备验证失败！") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                }
            }
        }

        function callbackOfTouchIP(responseText, status, isRequestAborted) {
            //console.log("callbackOfTouchIP Response: " + responseText);
//            if (status === 0) {
//                timer_main.isLastestRequestFailed = true;
//                if (isRequestAborted) {
//                    if (Ams.isNeedVerifyDevice()) {
//                        busyView.show(qsTr("网络连接超时，请检查网络是否畅通..."));
//                    }
//                } else {
//                    if (Ams.isNeedVerifyDevice()) {
//                        busyView.show(qsTr("网络连接失败，请检查网络是否畅通..."));
//                    }
//                }
//                root.startGetIP(); //重启获取IP流程
//                return;
//            }
            //console.log();
            //Ams.printCurrentTime();
            //console.log(">>>>>>>>>>>>>>>>Step3: Report quray IP result and get IP...");
            //responseText = ""; //Debug
            root.requestFromMyServer("getIPV2", "IP=" + Ams.QueryUrlOfIP + "&getIP=" + (responseText.length > 0 ? responseText : "fail") + (root.getDeviceSNForVerify().length > 0 ? ("&deviceNo=" + root.getDeviceSNForVerify()) : ""), callbackOfGetIP); //将使用url查询的结果上报服务端
        }

        function callbackOfGetIP(responseText, status, isRequestAborted) {
            //console.log("callbackOfGetIP Response: " + responseText);
            if (status === 0) {
                timer_main.isLastestRequestFailed = true;
                if (isRequestAborted) {
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接超时，请检查网络是否畅通..."));
                    }
                } else {
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接失败，请检查网络是否畅通..."));
                    }
                }
                root.startGetIP(); //重启获取IP流程
                return;
            }
            try {
                var responseJSON = JSON.parse(responseText);
                if (responseJSON.result != null) {
                    if (responseJSON.deviceNo == null || responseJSON.result.indexOf("missing ") === 0) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        return;
                    } else if (responseJSON.deviceNo !== root.getDeviceSNForVerify()) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备序列号不匹配！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        return;
                    }

                    switch (responseJSON.result) {
                    case "OK":
                    case "ok":
                        if (responseJSON.IP != null && responseJSON.Timeout != null) {
                            timer_ip_timeout.stop();
                            Ams.setCurrentIP(responseJSON.IP);
                            root.gotIP(Ams.getCurrentIP());
                            timer_ip_timeout.interval = parseInt(responseJSON.Timeout) * 60 * 1000; //获取的是以分钟为单位的整数
                            timer_ip_timeout.start();
                        } else {
                            if (Ams.isNeedVerifyDevice()) {
                                busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                            }
                            }
                        break;
                    case "refuse":
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备验证未通过！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        break;
                    default:
                        root.startGetIP(); //重启获取IP流程
                        break;
                    }

                    /* 已获取到IP */
                    //console.log("callbackOfGetIP: CurrentIP = " + Ams.getCurrentIP() + ", CurrentIPTimeout = " + timer_ip_timeout.interval);
                } else {
                    //console.log("callbackOfGetIP Error: responseText = " + responseText);
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                    }
                }
            } catch (e) {
                //console.log("callbackOfGetIP Error: Call JSON.parse(...) fail, responseText = " + responseText);
                if (Ams.isNeedVerifyDevice()) {
                    busyView.modalShow(qsTr("设备验证失败！") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                }
            }
        }
    }

    Timer {
        id: timer_ip_timeout
        interval: 0 //值为0时，每次连接设备都将要求重新获取IP
        repeat: false

        onTriggered: {
            console.log("timer_ip_timeout onTriggered: IP timeout, need to reacquire!");
            Ams.IPTimeout = true;
        }
    }

    Timer {
        id: timer_verify_timeout
        interval: 7200000 //未切换序列号的2个小时后要求重新验证设备
        repeat: false
        property bool need_verify_again: true //是否需要再次验证

        onRunningChanged: {
            //Ams.printCurrentTime();
            timer_verify_timeout.need_verify_again = !running;
        }

        onTriggered: {
            console.log("timer_verify_timeout onTriggered: Timeout, need verify next time!");
        }

//        onNeed_verify_againChanged: {
//            console.log("need_verify_again = " + need_verify_again);
//        }
    }

    Timer {
        id: timer_httpRequestTimeout
        interval : 10000 //默认10秒超时
        repeat: false
        property var requestHandler: null //连接句柄
        property bool isRequestAborted: false //连接是否被断开

        function abortLastestHandler() {
            if (requestHandler != null) {
                //console.log("abortLastestHandler called");
                try {
                    isRequestAborted = true;
                    requestHandler.abort();
                } catch (e) {
                    console.log("timer_httpRequestTimeout startForHandler: Call abort() failed!");
                } finally {
                    requestHandler = null;
                }
            }
        }

        function startForHandler(handler, timeout) {
            abortLastestHandler();
            isRequestAborted = false;
            requestHandler = handler;
            if (timeout != undefined) {
                interval = timeout;
            } else {
                interval = 10000; //默认10秒超时
            }
            start();
        }

        onTriggered: {
            //Ams.printCurrentTime();
            console.log("timer_httpRequestTimeout onTriggered: Request timerout!!!");
            abortLastestHandler();
        }

        onRunningChanged: {
            //console.log("timer_httpRequestTimeout onRunningChanged: running = " + running);
            if (!running) {
                requestHandler = null;
            }
        }
    }

    Timer {
        id: timer2_httpRequestTimeout
        interval : 10000 //默认10秒超时
        repeat: false
        property var requestHandler: null //连接句柄
        property bool isRequestAborted: false //连接是否被断开

        function abortLastestHandler() {
            if (requestHandler != null) {
                //console.log("abortLastestHandler called");
                try {
                    isRequestAborted = true;
                    requestHandler.abort();
                } catch (e) {
                    console.log("timer2_httpRequestTimeout startForHandler: Call abort() failed!");
                } finally {
                    requestHandler = null;
                }
            }
        }

        function startForHandler(handler, timeout) {
            abortLastestHandler();
            isRequestAborted = false;
            requestHandler = handler;
            if (timeout != undefined) {
                interval = timeout;
            } else {
                interval = 10000; //默认10秒超时
            }
            start();
        }

        onTriggered: {
            //Ams.printCurrentTime();
            console.log("timer2_httpRequestTimeout onTriggered: Request timerout!!!");
            abortLastestHandler();
        }

        onRunningChanged: {
            //console.log("timer2_httpRequestTimeout onRunningChanged: running = " + running);
            if (!running) {
                requestHandler = null;
            }
        }
    }

    Timer {
        id: timer_get_version_info
        repeat: false
        triggeredOnStart: true
        interval: 1
        //property bool isLastestRequestFailed: false //最近一次的网络连接是否失败

        onTriggered: {
            stop();
            timer_get_version_info.callbackOfStartGetVersionInfo();
        }

        function callbackOfStartGetVersionInfo() {
            //console.log();
            //Ams.printCurrentTime();
            //console.log(">>>>>>>>>>>>>>>>Step0: Get firmware info...");
            //Ams.saveCloudVersionInfo(null); //清空本地已存储的云端版本信息
            //Ams.refreshCurrentA2BPredefinedData("", null, null, null, null); //清空本地已存储A2B预设源配置信息
            root.requestVersionInfoFromMyServer(Ams.getDeviceType() + "_HW" + Ams.readDeviceVersion() + ".ver", callbackOfQueryVersionInfo);
//            var desFileName = Ams.getDeviceType() + "_HW" + Ams.readDeviceVersion() + ".ver";
//            //console.log("desFileName: " + desFileName);
//            //console.log("zr_download.cachePath = " + zr_download.cachePath);
//            zr_download.url = zr_download.getUrl(desFileName);

//            zr_download.callbackOfProgress = null;
//            zr_download.callbackOfError = callbackOfDownloadVersionInfoFileError;
//            zr_download.callbackOfFinished = callbackOfDownloadVersionInfoFileFinished;
//            zr_download.filePath = ""; //zr_download.cachePath;
//            zr_download.fileName = desFileName;
//            zr_download.httpDownload();
        }

//        function callbackOfDownloadVersionInfoFileError() {
//            console.log("callbackOfDownloadVersionInfoFileError called!");
//        }

//        function callbackOfDownloadVersionInfoFileFinished() {
//            console.log("callbackOfDownloadVersionInfoFileFinished called!");
//        }

        function callbackOfQueryVersionInfo(responseText, status, isRequestAborted) {
            //console.log("callbackOfQueryVersionInfo Response: " + responseText);
            if (status === 0 && dev_state.isIdentified) {
//                timer_get_version_info.isLastestRequestFailed = true;
                busyView.hide();
                if (isRequestAborted) {
                    //busyView.show(qsTr("网络连接超时，请检查网络是否畅通..."));
                    toast.show(qsTr("网络连接超时，请检查网络是否畅通..."));
                } else {
                    //busyView.show(qsTr("网络连接失败，请检查网络是否畅通..."));
                    toast.show(qsTr("网络连接失败，请检查网络是否畅通..."));
                }
//                root.startGetVersionInfo(); //重启获取设备固件信息
                return;
//            } else if (status === 0 || status === 404) { //设备信息文件不存在，使用内置值处理
//                root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
//                if (hidIO.isLoadMode()) {
//                    hidIO.reqLoadFirmware();
//                }
//                return;
            }

            if (status !== 200 || !timer_get_version_info.refreshVersionInfo(responseText)) { //设备信息文件无法获取或不存在或无法识别，使用内置值处理
                if (Ams.isDebug || Ams.isDemoMode()) {
                    busyView.hide();
                    toast.show(qsTr("操作失败，请稍候再试！"));
                    return;
                }
                refreshPredefinedDataByLocal(); //使用本地已缓存文件校验并更新A2B预设源信息
                root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
                if (hidIO.isLoadMode()) {
                    hidIO.reqLoadFirmware();
                }
                //busyView.show(qsTr("设备识别失败！") + qsTr("请重新连接设备再试。"));
            }
        }

        function refreshPredefinedDataByLocal() {
            //校验并更新A2B预设源信息
            var pdFileList = zr_download.getPdFileList();
            var curPdFileInfo = zr_download.getCurrentPdFileInfo(pdFileList);
            if (curPdFileInfo != null && curPdFileInfo.md5.length > 0) {
                var desA2BPredefinedFileName = zr_download.getA2BPredefinedFileName(curPdFileInfo.name);
                var filePath = zr_download.cachePath + desA2BPredefinedFileName;
                if (zr_download.checkFileMD5(filePath, curPdFileInfo.md5)) {
//                        if (zr_download.refreshPredefinedData(filePath)) {
//                            root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
//                        } else {
//                            busyView.show(qsTr("解析音源信息失败！") + qsTr("请重新连接设备再试。"));
//                        }
                    return zr_download.refreshPredefinedData(filePath);
                } else {
                    /* 删除失效的A2B配置文件及其文件信息 */
                    zr_download.removeFile(filePath);
                    zr_download.removePdFileInfo(pdFileList, curPdFileInfo);
                    zr_download.writeA2BPredefinedFileList(JSON.stringify(pdFileList));
                }
            }

            return false;
        }

        function refreshVersionInfo(responseText) {
            try {
                if (responseText.length > 0) {
                    var i, j;
                    var subIndex;
                    var isAdaptable = false; //是否有可适配的信息
                    var responseJSON = JSON.parse(responseText);
                    //console.log("responseJSON.length = " + responseJSON.length);

                    for (i = 0; i < responseJSON.length; i++) {
                        if (responseJSON[i].firmware_code_range != undefined) {
                            //console.log("responseJSON["+i+"].firmware_code_range = " + JSON.stringify(responseJSON[i].firmware_code_range));
                            if ((responseJSON[i].firmware_code_range.min != undefined && Ams.getFirmwareCode() < parseInt(responseJSON[i].firmware_code_range.min)) || (responseJSON[i].firmware_code_range.max != undefined && Ams.getFirmwareCode() > parseInt(responseJSON[i].firmware_code_range.max))) {
                                continue;
                            }
                        }

                        if (responseJSON[i].pc_code_range != undefined) {
                            //console.log("responseJSON["+i+"].pc_code_range = " + JSON.stringify(responseJSON[i].pc_code_range));
                            var curCode = Ams.getSoftCode();
                            subIndex = curCode.indexOf(' ');
                            if (subIndex > -1) {
                                curCode = parseInt(curCode.substring(0, subIndex));
                            } else {
                                curCode = parseInt(curCode);
                            }
                            if ((responseJSON[i].pc_code_range.min != undefined && curCode < responseJSON[i].pc_code_range.min) || (responseJSON[i].pc_code_range.max != undefined && curCode > responseJSON[i].pc_code_range.max)) {
                                continue;
                            }
                        }

                        if (responseJSON[i].pc_version_range != undefined) {
                            //console.log("responseJSON["+i+"].pc_version_range = " + JSON.stringify(responseJSON[i].pc_version_range));
                            if ((responseJSON[i].pc_version_range.min != undefined && Ams.versionCmp(Ams.getSoftVer(), responseJSON[i].pc_version_range.min) < 0) || (responseJSON[i].pc_version_range.max != undefined && Ams.versionCmp(Ams.getSoftVer(), responseJSON[i].pc_version_range.max) > 0)) {
                                continue;
                            }
                        }

                        if (responseJSON[i].pc_area != undefined) {
                            if (responseJSON[i].pc_area.length > 0) {
                                for (j = 0; j < responseJSON[i].pc_area.length; j++) {
                                    //console.log("responseJSON["+i+"].pc_area["+j+"] = " + responseJSON[i].pc_area[j]);
                                    if (Ams.isAdaptableArea(responseJSON[i].pc_area[j])) {
                                        isAdaptable = true;
                                        break;
                                    }
                                }
                            }
                        } else {
                            isAdaptable = true;
                        }

                        if (isAdaptable) {
                            if (responseJSON[i].rejected_sn != undefined) {
                                if (responseJSON[i].rejected_sn.some(function(item) { return (Ams.getDeviceSN().indexOf(item) > -1); })) {
                                    isAdaptable = false;
                                    continue;
                                }
                            }

                            if (isAdaptable) {
                                if (responseJSON[i].accepted_sn != undefined) {
                                    if (!responseJSON[i].accepted_sn.some(function(item) { return (Ams.getDeviceSN().indexOf(item) > -1); })) {
                                        isAdaptable = false;
                                        continue;
                                    }
                                }
                            }

                            break;
                        }
                    }

                    //用已识别的可适配信息刷新A2B源信息、升级信息
                    if (isAdaptable) {
                        var cloudVersion = responseJSON[i];
                        //console.log("cloudVersion: " + JSON.stringify(cloudVersion));
                        Ams.saveCloudVersionInfo(cloudVersion); //存储云端版本信息

                        //刷新升级固件后是否需要还原出厂配置及固件升级提示信息
                        var needReset = (cloudVersion.need_reset != undefined ? (parseInt(cloudVersion.need_reset) > 0) : false);
                        if (cloudVersion.need_reset_version != undefined) {
                            if (needReset) {
                                if (cloudVersion.need_reset_version.hardware_version != undefined) {
                                    //console.log("Ams.readDeviceVersion() = " + Ams.readDeviceVersion() + ", cloudVersion.need_reset_version.hardware_version = " + cloudVersion.need_reset_version.hardware_version);
                                    if (Ams.versionCmp(Ams.readDeviceVersion(), cloudVersion.need_reset_version.hardware_version) > 0) {
                                        needReset = false;
                                        //console.log("1 -- hardware_version");
                                    }
                                }
                            }
                            if (needReset) {
                                if (cloudVersion.need_reset_version.firmware_version != undefined) {
                                    if (Ams.versionCmp(Ams.readFirmwareVersion(), cloudVersion.need_reset_version.firmware_version) > 0) {
                                        needReset = false;
                                        //console.log("2 -- firmware_version");
                                    }
                                }
                            }
                            if (needReset) {
                                if (cloudVersion.need_reset_version.firmware_code != undefined) {
                                    if (Ams.readFirmwareCurCode() > parseInt(cloudVersion.need_reset_version.firmware_code)) {
                                        needReset = false;
                                        //console.log("3 -- firmware_code");
                                    }
                                }
                            }
                        }
                        Ams.setNeedResetConfigAfterUpgrade(needReset); //刷新固件升级后是否需要还原出厂配置
                        if (cloudVersion.firmware_tips != undefined) {
                            Ams.setUpgradeTips(cloudVersion.firmware_tips.cn, cloudVersion.firmware_tips.en, cloudVersion.firmware_tips.es, cloudVersion.firmware_tips.pt); //刷新固件升级提示信息
                        }

                        /* 匹配相同硬件版本的A2B固件信息 */
                        if (cloudVersion.a2b_firmwares != undefined) {
                            var curA2BVersion = Ams.getA2BVersionInfo();
                            var parsedCurA2BVersion = hidIO.parseA2BIAPFirmwareVersion(curA2BVersion);
                            for (i = 0; i < cloudVersion.a2b_firmwares.length; i++) {
                                var versionInfoItem = cloudVersion.a2b_firmwares[i];
                                if (versionInfoItem.version != undefined && versionInfoItem.md5 != undefined) {
                                    var parsedCloudA2BVersion = hidIO.parseA2BIAPFirmwareVersion(versionInfoItem.version);
                                    if (parsedCurA2BVersion.hardware_version === parsedCloudA2BVersion.hardware_version) {
                                        if (versionInfoItem.name != undefined) {
                                            cloudVersion.a2b_firmware_name = versionInfoItem.name;
                                        }

                                        cloudVersion.a2b_firmware_version = versionInfoItem.version;
                                        cloudVersion.a2b_firmware_md5 = versionInfoItem.md5;

                                        if (versionInfoItem.tips != undefined) {
                                            cloudVersion.a2b_firmware_tips = versionInfoItem.tips;
                                        }

                                        break;
                                    }
                                }
                            }
                        }

                        if (cloudVersion.a2b_firmware_tips != undefined) {
                            Ams.setUpgradeTips_A2B(cloudVersion.a2b_firmware_tips.cn, cloudVersion.a2b_firmware_tips.en, cloudVersion.a2b_firmware_tips.es, cloudVersion.a2b_firmware_tips.pt); //刷新A2B固件升级提示信息
                        }

                        if (hidIO.isLoadMode()) {
                            root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
                            zr_download.downloadFirmwareOrStartUpgrade(); //在升级状态时下载固件或直接升级
                            return true; //返回等待后续处理
                        } else {
                            if (Ams.isHasA2BRoute()) {
                                var isRefreshed = refreshPredefinedDataByLocal(); //使用本地已缓存文件校验并更新A2B预设源信息
                                var needRefreshAgain = !isRefreshed;
                                var pdFileList = zr_download.getPdFileList();
                                var curPdFileInfo = zr_download.getCurrentPdFileInfo(pdFileList);
                                //console.log("pdFileList: " + JSON.stringify(pdFileList));

                                if (isRefreshed) {
                                    /* 云端存在版本信息，则本地版本较低才使用云端版本，版本格式：1.0-20250923 */
                                    if (cloudVersion.a2b_predefined_version != undefined) {
                                        var curA2BPredefinedVersion = Ams.getA2BPredefinedVersion();
                                        var cloudA2BPredefinedVersion = cloudVersion.a2b_predefined_version;
                                        if (curA2BPredefinedVersion == cloudA2BPredefinedVersion) {
                                            if (curPdFileInfo != null && cloudVersion.a2b_predefined_md5 != undefined && curPdFileInfo.md5 !== cloudVersion.a2b_predefined_md5) {
                                                needRefreshAgain = true;
                                            }
                                        } else {
                                            var curA2BPredefinedVersionOfLeft = "";
                                            var curA2BPredefinedVersionOfRight = "";
                                            subIndex = curA2BPredefinedVersion.indexOf('-');
                                            if (subIndex > -1) {
                                                curA2BPredefinedVersionOfLeft = curA2BPredefinedVersion.substring(0, subIndex);
                                                curA2BPredefinedVersionOfRight = curA2BPredefinedVersion.substring(subIndex + 1);
                                            } else {
                                                curA2BPredefinedVersionOfLeft = curA2BPredefinedVersion;
                                            }
                                            //console.log("curA2BPredefinedVersionOfLeft = " + curA2BPredefinedVersionOfLeft + ", curA2BPredefinedVersionOfRight = " + curA2BPredefinedVersionOfRight);

                                            var cloudA2BPredefinedVersionOfLeft = "";
                                            var cloudA2BPredefinedVersionOfRight = "";
                                            subIndex = cloudA2BPredefinedVersion.indexOf('-');
                                            if (subIndex > -1) {
                                                cloudA2BPredefinedVersionOfLeft = cloudA2BPredefinedVersion.substring(0, subIndex);
                                                cloudA2BPredefinedVersionOfRight = cloudA2BPredefinedVersion.substring(subIndex + 1);
                                            } else {
                                                cloudA2BPredefinedVersionOfLeft = cloudA2BPredefinedVersion;
                                            }
                                            //console.log("cloudA2BPredefinedVersionOfLeft = " + cloudA2BPredefinedVersionOfLeft + ", cloudA2BPredefinedVersionOfRight = " + cloudA2BPredefinedVersionOfRight);

                                            var cmpResult = Ams.versionCmp(curA2BPredefinedVersionOfLeft, cloudA2BPredefinedVersionOfLeft);
                                            if (cmpResult < 0) {
                                                needRefreshAgain = true;
                                            } else if (cmpResult == 0) {
                                                if (curA2BPredefinedVersionOfRight < cloudA2BPredefinedVersionOfRight) {
                                                    needRefreshAgain = true;
                                                }
                                            }
                                        }
                                    } else {
                                        if (curPdFileInfo != null && cloudVersion.a2b_predefined_name != undefined && curPdFileInfo.name !== zr_download.getA2BPredefinedFileName(cloudVersion.a2b_predefined_name)) {
                                            needRefreshAgain = true;
                                        }
                                        if (curPdFileInfo != null && cloudVersion.a2b_predefined_md5 != undefined && curPdFileInfo.md5 !== cloudVersion.a2b_predefined_md5) {
                                            needRefreshAgain = true;
                                        }
                                    }
                                }
                                //console.log("needRefreshAgain = " + needRefreshAgain);

                                //如果存在A2B源预设信息字段，则获取A2B源预设信息并进行后续处理
                                if (needRefreshAgain && cloudVersion.a2b_predefined_md5 != undefined && cloudVersion.a2b_predefined_md5.length > 0) {
                                    //console.log("cloudVersion.a2b_predefined_md5 = " + JSON.stringify(cloudVersion.a2b_predefined_md5));
                                    //console.log("zr_download.checkDataMD5: " + zr_download.checkDataMD5(null, cloudVersion.a2b_predefined_md5));

                                    var desA2BPredefinedFileName = zr_download.getA2BPredefinedFileName(cloudVersion.a2b_predefined_name);
                                    //console.log("a2b fileName: " + desA2BPredefinedFileName);
                                    //console.log("zr_download.cachePath = " + zr_download.cachePath);
                                    zr_download.url = zr_download.getUrl(desA2BPredefinedFileName);

                                    var filePath = zr_download.cachePath + desA2BPredefinedFileName;
                                    if (zr_download.checkFileMD5(filePath, cloudVersion.a2b_predefined_md5)) {
//                                        console.log("checkFileMD5: true!");
//                                        if (!zr_download.refreshPredefinedData(filePath)) {
//                                            busyView.show(qsTr("解析音源信息失败！") + qsTr("请重新连接设备再试。"));
//                                            return true;
//                                        }

                                        if(zr_download.refreshPredefinedData(filePath)) {
                                            /* 更新列表里的A2B配置文件信息 */
                                            var isChanged = false;
                                            if (curPdFileInfo == null) {
                                                curPdFileInfo = {"name": desA2BPredefinedFileName, "md5": cloudVersion.a2b_predefined_md5, "DT": Ams.getDeviceType(), "HW": Ams.readDeviceVersion()};
                                                pdFileList.push(curPdFileInfo);
                                                isChanged = true;
                                            } else if (curPdFileInfo.name !== desA2BPredefinedFileName || curPdFileInfo.md5 !== cloudVersion.a2b_predefined_md5) {
                                                curPdFileInfo.name = desA2BPredefinedFileName;
                                                curPdFileInfo.md5 = cloudVersion.a2b_predefined_md5;
                                                isChanged = true;
                                            }
                                            if (isChanged) {
                                                //console.log("pdFileList: " + JSON.stringify(pdFileList));
                                                zr_download.writeA2BPredefinedFileList(JSON.stringify(pdFileList));
                                            }
                                        }
                                    } else {
//                                        console.log("checkFileMD5: false!");

                                        /* 删除名称不同的旧A2B配置文件及其文件信息 */
                                        if (curPdFileInfo != null) {
                                            var oldA2BPredefinedFileName = zr_download.getA2BPredefinedFileName(curPdFileInfo.name);
                                            if (oldA2BPredefinedFileName !== desA2BPredefinedFileName) {
                                                zr_download.removeFile(zr_download.cachePath + oldA2BPredefinedFileName);
                                                zr_download.removePdFileInfo(pdFileList, curPdFileInfo);
                                                zr_download.writeA2BPredefinedFileList(JSON.stringify(pdFileList));
                                            }
                                        }

                                        zr_download.callbackOfProgress = null;
                                        zr_download.callbackOfError = zr_download.callbackOfDownloadA2BPredefinedFileError;
                                        zr_download.callbackOfFinished = zr_download.callbackOfDownloadA2BPredefinedFileFinished;
                                        zr_download.filePath = zr_download.cachePath;
                                        zr_download.fileName = desA2BPredefinedFileName;
                                        zr_download.httpDownload();
                                        return true; //返回等待下载完成后，回调进入校验等后继处理
                                    }
                                }
                            }

                            root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
                            return true;
                        }
                    }

//                    console.log("responseJSON[0].pc_area = " + JSON.stringify(responseJSON[0].pc_area));
//                    if (responseJSON.length > 0) {
//                        if (responseJSON.deviceNo == null || responseJSON.result.indexOf("missing ") === 0) {
//                            if (Ams.isNeedVerifyDevice()) {
//                                busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
//                            }
//                            return true;
//                        }

//                        if (timer_get_version_info.isLastestRequestFailed) {
//                            timer_get_version_info.isLastestRequestFailed = false;
//                            if (Ams.isNeedVerifyDevice()) {
//                                busyView.modalShow(qsTr("设备识别中，请稍候...")); //刷新一次提示，以免网络由断开转为恢复时仍提示断开的情况
//                            }
//                        }
//                    }
                }
            } catch (e) {
                console.log("callbackOfQueryVersionInfo Error: Call JSON.parse(...) failed!");
            }

            return false;
        }
    }

    /* 自动备份数据定时器 */
    Timer {
        id: timer_auto_backup_data
        repeat: true
        triggeredOnStart: true
        interval : 60000 //每隔1分钟触发一次备份
        readonly property int recoverableDataFileCount: 20 //可恢复的数据文件数量

        onTriggered: {
            //console.log("timer_auto_backup_data.onTriggered");

            var checkSameFilePath = null;
            var fileList = cfgFile.readModeFileList(zr_download.tempPath);
            if (fileList.length > 0) {
                checkSameFilePath = zr_download.tempPath + fileList[0];
            }

            var dateTime = new Date();
            var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth() < 9 ? "0" : "") + (dateTime.getMonth() + 1) + "-" + (dateTime.getDate() < 10 ? "0" : "") + dateTime.getDate() + "_" + (dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + "_" + (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes() + "_" + (dateTime.getSeconds() < 10 ? "0" : "") + dateTime.getSeconds();
            delete dateTime;

            var fileName = strDateTime + ".ghc";
            //console.log("timer_auto_backup_data: fileName = " + fileName);
            //console.log("timer_auto_backup_data: checkSameFilePath = " + checkSameFilePath);
            var state = saveFile.saveCfgDataToFile(zr_download.tempPath + fileName, "11111111", checkSameFilePath);

            if (state) {
                fileList = cfgFile.readModeFileList(zr_download.tempPath);
                if (fileList.length > recoverableDataFileCount) { //已备份数据文件超限，需要删除旧文件
                    for (var i = recoverableDataFileCount; i < fileList.length; i++) {
                        zr_download.removeFile(zr_download.tempPath + fileList[i]);
                    }
                    fileList.splice(recoverableDataFileCount, fileList.length - recoverableDataFileCount);
                }
            }
        }
    }

    QAESEncryption {
        id: qaesencryption
    }

    QTracert {
        id: qTracert
        property bool isNeedTracert1: false //一次追踪
        property bool isNeedTracert2: false //二次追踪
        property bool isNeedRoutePrint: false //路由表打印
        property bool isNeedIpconfig: false //网络适配器查询
        property bool isNeedAnyTracert: (isNeedTracert1 || isNeedTracert2 || isNeedRoutePrint || isNeedIpconfig)
        property bool isTracert1Finished: false
        property bool isTracert2Finished: false
        property bool isRoutePrintFinished: false
        property bool isIpconfigFinished: false
        property bool isAllTracertFinished: (isTracert1Finished && isTracert2Finished && isRoutePrintFinished && isIpconfigFinished)
        property int tracertIndex: 0
        property string ip: ""
        property string argusTracert1: ""
        property string argusTracert2: ""
        property string argusRoutePrint: ""
        property string argusIpconfig: ""

        onProcessFinished: {
            //console.log("qTracert onProcessFinished: exitCode = " + exitCode + ", cmd = " + cmd + ", responseText.length = " + responseText.length);
            if (exitCode == 0) {
                switch (cmd) {
                case "tracert":
                    if (tracertIndex == 1) {
                        Ams.CurrentTracert1Response = responseText;
                        qTracert.isTracert1Finished = true;
                    } else if (tracertIndex == 2) {
                        tracertIndex = 0;
                        Ams.CurrentTracert2Response = responseText;
                        qTracert.isTracert2Finished = true;
                    }
                    break;
                case "route print":
                    Ams.CurrentRoutePrintResponse = responseText.replace(/=/g, "");
                    qTracert.isRoutePrintFinished = true;
                    break;
                case "ipconfig":
                    Ams.CurrentIpconfigResponse = responseText;
                    qTracert.isIpconfigFinished = true;
                    break;
                default:
                    break;
                }

                if (qTracert.isNeedTracert1) {
                    if (!qTracert.isTracert1Finished) {
                        qTracert.tracertIndex = 1;
                        qTracert.startProcess("tracert", qTracert.argusTracert1);
                        return;
                    }
                } else {
                    qTracert.isTracert1Finished = true;
                }
                if (qTracert.isNeedTracert2) {
                    if (!qTracert.isTracert2Finished) {
                        qTracert.tracertIndex = 2;
                        qTracert.startProcess("tracert", qTracert.argusTracert2 + " " + qTracert.ip);
                        return;
                    }
                } else {
                    qTracert.isTracert2Finished = true;
                }
                if (qTracert.isNeedRoutePrint) {
                    if (!qTracert.isRoutePrintFinished) {
                        qTracert.startProcess("route print", qTracert.argusRoutePrint);
                        return;
                    }
                } else {
                    qTracert.isRoutePrintFinished = true;
                }
                if (qTracert.isNeedIpconfig) {
                    if (!qTracert.isIpconfigFinished) {
                        qTracert.startProcess("ipconfig", qTracert.argusIpconfig);
                        return;
                    }
                } else {
                    qTracert.isIpconfigFinished = true;
                }
            }
        }

        onIsAllTracertFinishedChanged: {
            if (qTracert.isAllTracertFinished) {
                if ( Ams.isDeviceInfoSaved()) {
                    hidIO.requestVerify(qTracert.ip, Ams.CurrentTracert1Response, Ams.CurrentTracert2Response, Ams.CurrentRoutePrintResponse, Ams.CurrentIpconfigResponse); //设备验证
                } else {
                    root.startGetIP(); //重启获取IP流程
                }
                qTracert.ip = "";
            }
        }

        onProcessErrorOccurred: {
            //console.log("qTracert onProcessErrorOccurred: " + errorCode);
            if (errorCode != 1) { //非发生中止的情况则弹出失败提示
                busyView.modalShow(qsTr("设备验证失败！") + ("(" + qsTr("错误码：") + errorCode + ")") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
            }
        }

        function startTracert(IP) {
            qTracert.ip = IP;
            qTracert.isTracert1Finished = false;
            qTracert.isTracert2Finished = false;
            qTracert.isRoutePrintFinished = false;
            qTracert.isIpconfigFinished = false;
            Ams.CurrentTracert1Response = "";
            Ams.CurrentTracert2Response = "";
            Ams.CurrentRoutePrintResponse = "";
            Ams.CurrentIpconfigResponse = "";
            qTracert.processFinished(0, "", ""); //主动触发信号以开始路由跟踪
        }
    }

//    QPro{
//        id: qpros
//        onUpdError: {
//            console.log("onUpdError--->code="+code+",msg="+msg);
//            if(code==-1){
//                toast.show(qsTr("更新失败"));
//            }else if(code ==-5){
//                toast.show(qsTr("文件已损坏，请重新下载"));
//            }
//        }
//    }

    BusyView {
        id:busyView
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter
//        x: (root.width-width)/ 2
//        y: (root.height-height)/2
        function modalShow(tip, showInDebugMode) {
            closeAllDialog();
            show(tip, showInDebugMode);
        }
        function closeAllDialog() {
            md_close.visible = false;
            msgbox.visible = false;
            msgbox_used.visible = false;
            msgbox_load.visible = false;
            loadFile.visible = false;
            saveFile.visible = false;
            load_menu.close();
            save_menu.close();
            passwd_input_frame.close();
            //reset_win.close()
            msgbox_reset_all.close();
            dac_filter_shape_setting_frm.close();
            reset_warning_frm.close();
            reset_timeout_frm.close();
            signal_detection_win.close();
            karaoke_settings_win.close();
            modes_win.close();
            lang_win.close();
            ioInputEQ.closeAllDialog();
            rep_outgrp.closeAllAliasMenu();
            io.closeAllSubWinAndAliasMenu();
            passwd_check_frame.close();
            passwd_set_frame.close();
            md_upd.visible = false;
            msgBox_A2BIAPStatus.close();
            msgBox_universal.close();
            fileDialog_load_mode.visible = false;
            fileDialog_save_mode.visible = false;
            upd_reset_warning_frm.close();
            can_ctrl_settings_win.close();
            noise_threshold_setting_frm.close();
            power_off_delay_setting_frm.close();
            a2b_params_setting_frm.close();
            query_can.closeAllDialog();
            car_model_settings_win.close();
        }
        onShowing: {
            io.isToolTipVisibleEnabled = false;
            busyView.forceActiveFocus();
            main_vol.enabled=false;
            channel_vol.enabled=false;
            grahp_frame.disFrame();
        }
        onHideing: {
            io.isToolTipVisibleEnabled = true;
            main_vol.enabled=true;
            channel_vol.enabled=true;
            grahp_frame.enFrame();
        }

    }
    onClosing: {
        close.accepted=false;
        console.log("application will close soon.");
        if(hidIO.isChange){
            showCloseDias(qsTr("警告"),qsTr("模式未保存，是否不保存退出？"),1);
        }else{
            if (Ams.isHasGainDetectModule()) {
                timer_meter.setMeterEnable(false);
            }
            close.accepted=true;
            qTracert.stopProcess();
            Qt.quit();
        }

    }
    Rectangle {
        x:4
        y:4
        id: manu_bar_buttons
        width: parent.width-8 //left and right span:4, 1272 pix in fact.
        height: 37
        border.color: "#495156"
        border.width: 1
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#010406" }
            GradientStop { position: 1.0; color: "#1e3142" }
        }
        property int  current_selected: 0
        Item {
            width: parent.width
            height: parent.height
            id:row_menu
            property var current_cfg_file: qsTr("未指定")
            property bool  refresh_world;
            property var password: "";
            FileIO {
                id: cfgFile
                onError: console.log(msg)
            }
            FileDialog {
                id: saveFile
                readonly property string currentVersion: "2.4.0"; //配置文件版本
                property string file: "./default.ghc"
                title: qsTr("请选择要保存的文件名")
                selectExisting:false
                // folder: shortcuts.home
                nameFilters: Ams.isForCDT() ? [ /*qsTr*/"DSP cfg files (*.dspc)"] : [ "GoldHorn cfg files (*.ghc)"]
                onVisibleChanged: {
                    if (visible) {
                        busyView.show(qsTr("请稍候..."));
                    } else {
                        busyView.hide();
                    }
                }
                onAccepted: {
                    loadFile.savedFolder = saveFile.folder = fileDialog_load_mode.folder = fileDialog_save_mode.folder = fileUrl.toLocaleString().substring(0, fileUrl.toLocaleString().lastIndexOf('/')); //必须赋值一次，否则再次弹出时目录不切换，是Qt的Bug？
//                    busyView.show(qsTr("保存中，请稍候..."));
                    file=fileUrl;
                    file=file.substring(8);
                    row_menu.current_cfg_file=file;
                    //console.log("You chose: " + file);
                    saveFile.saveCfgDataToFile(file, row_menu.password, null);
                    //busyView.hide();
                }
                onRejected: {
                    console.log("Canceled")
                }

                function saveCfgDataToFile(filePath, desKey, checkSameFilePath) {
                    var saveCfgData = {
                        HW: Ams.readDeviceVersion(), //硬件版本
                        ECM:Ams.getEqCorrMode(), //EQ联调模式
                        VCM:Ams.getVolCorrMode(), //音量联调模式
                        //FCM:Ams.getFiltersCorrelationMode(), //高低通分频联动模式
                        CDST:Ams.getCurrentDigitalSrcType(null), //当前数字信号类型（光纤/同轴）
                        ISGD:Ams.getSumGraphDisplayFlags(), //图形叠加开关状态（仅PC端使用）
                        CFGDATA:Ams.DspCfgData, //输出通道配置
                        CFGDATAEXT:Ams.DspCfgDataExtend, //输出通道扩展配置
                        CFGDATAEXT32TO47:Ams.DspCfgDataExtend_32_TO_47, //输出通道扩展配置
                        ASCDATA:(Ams.isHasAnalogInputAlias() || Ams.isHasAnalogInputPhase())?Ams.AnalogSrcCfgData:null, //输入源配置（最多16个）
                                                                                              MAINVOL:Ams.getMainVolume() //主音量
                    };
                    if (Ams.isHasAllpassModule()) { //带Allpass相关功能的型号使用第二版设备型号标识
                        saveCfgData.DT = ""; //第一版设备型号标识（与当前连接的设备型号一致才能使用导入的配置）
                        saveCfgData.DTV2 = Ams.readDeviceType() + (Ams.isDARoutingMixed() ? "_DAMIXED" : "" ); //第二版设备型号标识（与当前连接的设备型号一致才能使用导入的配置）
                    } else {
                        saveCfgData.DT = Ams.readDeviceType() + (Ams.isDARoutingMixed() ? "_DAMIXED" : "" ); //第一版设备型号标识（与当前连接的设备型号一致才能使用导入的配置）
                    }

                    if (Ams.isHasDtsModule()) {
                        if (Ams.getDeviceType() === Ams.GSR1) {
                            saveCfgData.DTSIT = Ams.getDtsInputType(); //DTS输入源类型（数字：DIGITAL；模拟：ANALOG；）
                            saveCfgData.DTSPCM = Ams.getDtsPcmMode(); //获取DTS的PCM模式
                            saveCfgData.DTSBASS = Ams.getDtsBassMode(); //获取DTS的低音模式(即拐点)
                        }
                        saveCfgData.DTSEN = Ams.isDtsEnabled()?1:0; //DTS是否已使能
                        saveCfgData.DTSOT = Ams.getDtsOutputType(); //VSRx系列获取DTS虚拟环绕输出格式、GSR-1获取DTS输出格式
                        saveCfgData.DTSSCD = Ams.DtsSrcCfgData; //DTS输入源配置

                    }

                    if (Ams.isInputEQExist()) {
                        saveCfgData.BASEINCFGDATA = Ams.DspBaseInputsCfgData; //基础输入源配置
                    }

                    if (Ams.isVSRxSeriesDevice()) {
                        saveCfgData.DSDOT = Ams.getDsdOutputType(); //VSRx系列DSD输出格式
                    }

                    if (Ams.isHasHdmiPlayStateSwitch()) {
                        saveCfgData.HPS = Ams.getHdmiPlayState(); //HDMI工作状态
                    }

                    if (Ams.isHasDspBypassModule()) {
                        saveCfgData.DSPBYPASS = Ams.isDspBypass()?1:0; //是否有DSP直通功能
                    }

                    if (Ams.isHasA2BRoute()) {
                        saveCfgData.MainModelID = Ams.A2BMainModelID;
                        saveCfgData.SubModelID = Ams.A2BSubModelID;
                        saveCfgData.SubModelVersion = Ams.A2BSubModelVersion;

                        if (Ams.isOriginalCarEqExist()) {
                            saveCfgData.OriginalCarEqEnable = Ams.getOriginalCarEqEnable();
                        }
                        if (Ams.isSoundFieldBalanceExist()) {
                            saveCfgData.SoundFieldBalanceEnable = Ams.getSoundFieldBalanceEnable();
                        }
                    }

                    if (Ams.isHasRemixModeOptions()) {
                        saveCfgData.RM = Ams.getRemixMode(); //混音模式
                        if (Ams.isHasA2BRoute()) {
                            saveCfgData.NA2BRG = Ams.getNonA2BReduceGain(); //非A2B信号增益减小值
                            saveCfgData.A2BS = Ams.getA2BSensitivity(); //A2B信号灵敏度
                            saveCfgData.A2BR = Ams.getA2BReleaseTime(); //A2B信号释放延时时间
                        } else {
                            saveCfgData.NARG = Ams.getNonAnalogReduceGain(); //非模拟信号增益减小值
                            saveCfgData.AS = Ams.getAnalogSensitivity(); //模拟信号检测灵敏度
                            saveCfgData.AR = Ams.getAnalogReleaseTime(); //模拟信号检测释放延时时间
                        }

                        if (Ams.isAdjustableSoundCardFirstExist()) {
                            saveCfgData.SCS = Ams.getSoundCardSensitivity(); //USB声卡信号灵敏度
                            saveCfgData.SCR = Ams.getSoundCardReleaseTime(); //USB声卡信号释放延时时间
                        }


                        if (Ams.isAdjustableBluetoothFirstExist()) {
                            saveCfgData.BS = Ams.getBluetoothSensitivity(); //蓝牙信号灵敏度
                            saveCfgData.BR = Ams.getBluetoothReleaseTime(); //蓝牙信号释放延时时间
                        }

                        if (Ams.isAdjustablePlayerFirstExist()) {
                            saveCfgData.DS = Ams.getDigitalSensitivity(); //主机信号灵敏度
                            saveCfgData.DR = Ams.getDigitalReleaseTime(); //主机信号释放延时时间
                        }

                        if (Ams.isHasSpdifRoute()) {
                            if (Ams.isAdjustablePlayerFirstExist()) {
                                saveCfgData.SS = Ams.getSpdifSensitivity(); //SPDIF信号灵敏度
                                saveCfgData.SR = Ams.getSpdifReleaseTime(); //SPDIF信号释放延时时间
                            } else {
                                saveCfgData.DS = Ams.getDigitalSensitivity(); //数字信号灵敏度
                                saveCfgData.DR = Ams.getDigitalReleaseTime(); //数字信号释放延时时间

                            }
                            //saveCfgData.DP = Ams.getDigitalPriority()?1:0; //数字优先开关
                        }
                    }

                    if (Ams.isHasOutputBridgeJointModule()) {
                        saveCfgData.OBJ = Ams.OutputBridgeJoint; //输出通道桥接开关列表
                    }

                    if (Ams.isNoiseThresholdExist()) {
                        saveCfgData.NTRT = Ams.NoiseThresholdReleaseTime;
                        saveCfgData.NTS = Ams.NoiseThresholdSensitivity;
                    }

                    if (Ams.isDacFilterShapeExist()) {
                        saveCfgData.DFS = Ams.DacFilterShape;
                    }

                    if (Ams.isHasKaraokeRoute()) {
                        saveCfgData.KKM = Ams.KaraokeMode; //卡拉OK输出模式
                        saveCfgData.KAS = Ams.AccompanySource; //卡拉OK伴奏音源
                        saveCfgData.KKMG = Ams.KaraokeMixerGain; //卡拉OK输出增益
                        saveCfgData.KMIMG = Ams.MicInputMixerGain; //MIC输入增益
                        saveCfgData.KMEFG = Ams.MicEchoFeedbackGain; //MIC ECHO反馈音量
                        saveCfgData.KMEMG = Ams.MicEchoMixerGain; //MIC ECHO混响增益
                        saveCfgData.KMEFD = Ams.MicEchoFeedbackDelay; //MIC ECHO混响延时（单位：毫秒）
                        saveCfgData.KMMRD = Ams.MicMixerReadyDelay; //MIC混响预延时（单位：毫秒）
                        saveCfgData.KMR = Ams.MicReverb;//MIC混响参数
                        saveCfgData.KML = Ams.MicLowpass; //MIC低通滤波器
                        saveCfgData.KMH = Ams.MicHighpass; //MIC高通滤波器
                        saveCfgData.KMSF = Ams.MicShiftFreq; //MIC频点相对值
                        saveCfgData.KMG = Ams.MicGain; //MIC增益
                        saveCfgData.KMQ = Ams.MicQ; //MIC Q值
                    }

                    if (Ams.isHasSurroundRoute()) {
                        if (Ams.getSurroundSrcLength() > 6) {
                            saveCfgData.FrontSurroundEnhanceEnable = Ams.FrontSurroundEnhanceEnable; //天空全景声前环绕增强使能状态
                            saveCfgData.RearSurroundEnhanceEnable = Ams.RearSurroundEnhanceEnable; //天空全景声后环绕增强使能状态
                        } else {
                            saveCfgData.SurroundEnhanceEnable = Ams.SurroundEnhanceEnable; //天空全景声环绕增强使能状态
                        }
                        if (Ams.getSurroundSrcLength() > 2) {
                            saveCfgData.SubHarmEnable = Ams.SubHarmEnable; //低音谐波使能状态
                            saveCfgData.SoundFiledExpandEnable = Ams.SoundFiledExpandEnable; //声场扩展立体声使能状态
                            saveCfgData.SoundFiledExpandCutFreq = Ams.SoundFiledExpandCutFreq; //声场扩展模块截止频率（范围：500~2000Hz，步进：100Hz）
                            saveCfgData.SoundFiledExpandGain = Ams.SoundFiledExpandGain; //声场扩展模块增益（范围：-12dB/-9dB/-6dB/-1dB）
                            saveCfgData.TrebleBoostEnable = Ams.TrebleBoostEnable; //高音增强使能状态
                            saveCfgData.TrebleBoostGain = Ams.TrebleBoostGain; //高音增强增益
                            saveCfgData.CenterEnhanceEnable = Ams.CenterEnhanceEnable; //中置增强使能状态
                            saveCfgData.CenterTrebleBoostEnable = Ams.CenterTrebleBoostEnable; //中置高音增强使能状态
                            saveCfgData.CenterTrebleBoostGain = Ams.CenterTrebleBoostGain; //中置高音增强增益
                            saveCfgData.BassBoostEnable = Ams.BassBoostEnable; //低音增强使能状态
                            saveCfgData.BassBoostFreq = Ams.BassBoostFreq; //低音增强截止频率（范围：20~60Hz，步进：1Hz）
                            saveCfgData.BassBoostGain = Ams.BassBoostGain; //低音增强增益（范围：0dB/+3dB/+6dB/+9dB）
                        }
                        saveCfgData.SurroundInputSrcCfgData = Ams.SurroundInputSrcCfgData; //天空全景声输入源配置
                    }

                    if (Ams.isInputDLCExist()) {
                        saveCfgData.DspBaseInputsDlcCfgData = Ams.DspBaseInputsDlcCfgData;
                    }

                    if (Ams.isConfigSourceBydB()) {
                        saveCfgData.VERSION = currentVersion; //配置文件版本
                    }

                    var desData = JSON.stringify(saveCfgData);
                    if (checkSameFilePath != null) {
                        var checkSameData = cfgFile.read(checkSameFilePath, desKey);
                        if (desData === checkSameData) {
                            //console.log("saveCfgDataToFile: same data, not saved!");
                            return false;
                        }
                    }

                    if (Ams.isConfigSourceBydB() && Ams.getDeviceType() !== Ams.GDT216) {
                        cfgFile.write_V2(filePath, desData, desKey); //除GDT216外，其它支持dB值配置输入源的型号用新的配置文件版本保存以避免相互导入不兼容的配置
                    } else {
                        cfgFile.write_V1(filePath, desData, desKey);
                    }

                    return true;
                }
            }
            FileDialog {
                id: loadFile
                readonly property string adaptableVersion: "2.4.x" //可适配的最大配置文件版本
                property string file: "./default.ghc"
                property var savedFolder
                property bool isLoadTempFile: false
                property int lastCmdIndex: -1 //保存最后一条指令序号
                title: qsTr("请选择要加载的配置文件")
                //  folder: shortcuts.home
                nameFilters: Ams.isForCDT() ? [ /*qsTr*/"DSP cfg files (*.dspc)"] : [ "GoldHorn cfg files (*.ghc)"]
                signal intputEnd();
                onIntputEnd: {
                    passwd_input_frame.call_back_target=null;
                    //console.log("user password:"+local_root.password);
                    parseFile(file, row_menu.password);
                }
                onVisibleChanged: {
                    if (visible) {
                        if (isLoadTempFile) {
                            folder = "file:///" + zr_download.tempPath;
                        } else {
                            folder = savedFolder;
                        }
                        busyView.show(qsTr("请稍候..."));
                    } else {
                        busyView.hide();
                    }
                }
                function parseFile(filename, desKey)
                {
                    var data=cfgFile.read(filename, desKey);
                    switch(data)
                    {
                    case "unknown":
                        row_menu.current_cfg_file=qsTr("未指定")
                        file="";
                        msgbox.title=qsTr("文件错误");
                        msgbox.text=qsTr("配置文件不可识别，加载失败！")
                        msgbox.visible=true;
                        return;
//                        break;
                    case "error":
                        if (busyView.isBusy()) {
                            break;
                        }
                        passwd_input_frame.title=qsTr("请输入密码：")
                        passwd_input_frame.call_back_target=loadFile;
                        passwd_input_frame.open();
//                        console.log("user password:"+desKey);
                        break;
                    default:
                        busyView.show(qsTr("载入中，请勿断开设备..."));
                        var isLastestMeterEnabled = timer_meter.isMeterEnabled; //最近一次的增益检测开关状态
                        try{
//                            console.log("data =");
//                            console.log(data.substring(0, 30000));
//                            console.log(data.substring(30000, 60000));
//                            console.log(data.substring(60000, 90000));
//                            console.log(data.substring(90000, 120000));
//                            console.log(data.substring(120000, 150000));
//                            console.log(data.substring(150000, 180000));
//                            console.log(data.substring(180000));
//                            console.log("data end");
                            var loadCfgData = JSON.parse(data);
                            var isMatch = true;
//                            var isA2BModelMatch = true;
                            var isNeedTransDspCfgData = false;
                            var ignoreBluetoothSrc = false;

                            if (loadCfgData.VERSION !== undefined) {
                                if (Ams.versionCmp(loadCfgData.VERSION, adaptableVersion) > 0) {
                                    isMatch = false;
                                }
                            }
                            //console.log("loadCfgData.DT = " + loadCfgData.DT);
                            //console.log("loadCfgData.DTV2 = " + loadCfgData.DTV2);

                            if (isMatch) {
                                isMatch = false;
                                if (loadCfgData.DT != null) {
                                    if (loadCfgData.DT.length > 0) { //说明配置文件是第一版
                                        if (Ams.isHasAllpassModule() && ((Ams.getDeviceType() == Ams.GDT212 || Ams.isMatchDeviceType(Ams.GDT212)) || (Ams.getDeviceType() == Ams.GDT216 || Ams.isMatchDeviceType(Ams.GDT216)))) { //带Allpass的GDT212、GDT216输出路数变多，需要转换才可以导入
                                            isNeedTransDspCfgData = true;
                                        }
                                        loadCfgData.DTV2 = loadCfgData.DT;
                                    } else { //说明配置文件是第二版，不支持Allpass的固件不能导入第二版本配置文件
                                        if (!Ams.isHasAllpassModule()) {
                                            loadCfgData.DTV2 = null;
                                        }
                                    }
                                }
                                if (loadCfgData.DTV2 != null) {
                                    if (Ams.isDARoutingMixed()) {
                                        isMatch = ((Ams.getDeviceType() + "_DAMIXED") == loadCfgData.DTV2);
                                    } else {
                                        isMatch = ((Ams.getDeviceType() == loadCfgData.DTV2 || Ams.isMatchDeviceType(loadCfgData.DTV2)) || (Ams.getDeviceType() + "_DAMIXED") == loadCfgData.DTV2);
                                        if (loadCfgData.DTV2.indexOf("_DAMIXED") != -1) {
                                            ignoreBluetoothSrc = true;
                                        }

                                        if (isMatch) {
                                            if (Ams.isMatchDeviceType(loadCfgData.DTV2) && (Ams.getDeviceType() == Ams.AB218 || Ams.getDeviceType() == Ams.AB216_U || Ams.getDeviceType() == Ams.AB216_M9)) {
                                                isNeedTransDspCfgData = true;
                                            }
                                        }
                                    }
                                }

//                                /* 处理车型匹配 */
//                                if (isMatch) {
//                                    if (Ams.isHasA2BRoute()) {
//                                        if (loadCfgData.MainModelID != null && loadCfgData.SubModelID != null) {
//                                            if (parseInt(loadCfgData.MainModelID) !== Ams.A2BMainModelID || parseInt(loadCfgData.SubModelID) !== Ams.SubModelID) {
//                                                isMatch = false;
//                                                isA2BModelMatch = false; //指示车型不匹配
//                                            }
//                                        }
//                                    }
//                                }
                            }

                            if(isMatch/* || (Ams.getDeviceType()==Ams.GD16&&loadCfgData.DTV2==null)*/) {

                                var srcLength;
                                var desLength;
                                var count;
                                var srcCfgData;
                                var i;
                                if (Ams.getDeviceType() === Ams.GDT06) { //GDT06型号固件版本V1.3.x及以上，输出通道EQ段数变少，导入时需要进行处理
                                    count = Ams.getAllIndepOutputsLength();
                                    for (var ch = 0; ch < count; ch++) {
                                        srcLength = loadCfgData.CFGDATA[ch].Analog.shift_freq.length;
                                        desLength = Ams.DspCfgData[ch].Analog.shift_freq.length;
                                        //console.log("srcLength = " + srcLength + ", desLength = " + desLength);
                                        //console.log("1--CFGDATA: " + JSON.stringify(loadCfgData.CFGDATA));
                                        var srcFreqBands = Ams.getFreqBands(srcLength);
                                        var desFreqBands = Ams.getFreqBands(desLength);
                                        if (srcLength < desLength) {
                                            var tailZero = [];
                                            var tailQ = [];
                                            var tailS = [];

                                            for (i = srcLength; i < desLength; i++) {
                                                tailZero.push(0);
                                                tailQ.push(4.0);
                                                tailS.push(1.0);
                                            }
                                            srcCfgData = Ams.getOutputEqCfgDataByChannelIdxByDB(ch, loadCfgData.CFGDATA);
                                            if (srcCfgData.type != null && srcCfgData.type.length === srcLength) {
                                                srcCfgData.type.push.apply(srcCfgData.type, tailZero);
                                            }
                                            for (var j = 0; j < srcLength; j++) {
                                                srcCfgData.shift_freq[j] = srcFreqBands[j] + srcCfgData.shift_freq[j] - desFreqBands[j];
                                            }
                                            srcCfgData.shift_freq.push.apply(srcCfgData.shift_freq, tailZero);
                                            srcCfgData.gain.push.apply(srcCfgData.gain, tailZero);
                                            srcCfgData.Q.push.apply(srcCfgData.Q, tailQ);
                                            if (srcCfgData.S != null && srcCfgData.S.length === srcLength) {
                                                srcCfgData.S.push.apply(srcCfgData.S, tailS);
                                            }

                                            /* 滤波器斜率范围兼容处理 */
                                            if (srcCfgData.pass_band.high.slope > 1) {
                                                srcCfgData.pass_band.high.slope = 1;
                                            }
                                            if (srcCfgData.pass_band.low.slope > 1) {
                                                srcCfgData.pass_band.low.slope = 1;
                                            }
                                        } else if (srcLength > desLength) {
                                            srcCfgData = Ams.getOutputEqCfgDataByChannelIdxByDB(ch, loadCfgData.CFGDATA);
                                            if (srcCfgData.type != null) {
                                                srcCfgData.type = srcCfgData.type.slice(0, desLength);
                                            }
                                            srcCfgData.shift_freq = srcCfgData.shift_freq.slice(0, desLength);
                                            for (var j = 0; j < desLength; j++) {
                                                srcCfgData.shift_freq[j] = srcFreqBands[j] + srcCfgData.shift_freq[j] - desFreqBands[j];
                                            }
                                            srcCfgData.gain = srcCfgData.gain.slice(0, desLength);
                                            srcCfgData.Q = srcCfgData.Q.slice(0, desLength);
                                            if (srcCfgData.S != null) {
                                                srcCfgData.S = srcCfgData.S.slice(0, desLength);
                                            }
                                        }
                                        //console.log("2--CFGDATA: " + JSON.stringify(loadCfgData.CFGDATA));
                                    }
                                }

                                /* 导入配置到数据库 */
                                if (isNeedTransDspCfgData) {
                                    Ams.transDspCfgData(loadCfgData.DTV2, loadCfgData.CFGDATA, loadCfgData.CFGDATAEXT, loadCfgData.CFGDATAEXT32TO47);
                                    if (loadCfgData.DTV2 != Ams.getDeviceType()) {
                                        loadCfgData.ECM = "non";
                                        loadCfgData.VCM = "non";
                                    }
                                } else {
                                    Ams.DspCfgData = loadCfgData.CFGDATA;
                                    if (loadCfgData.CFGDATAEXT != null) {
                                        Ams.DspCfgDataExtend = loadCfgData.CFGDATAEXT;
                                    }
                                    if (loadCfgData.CFGDATAEXT32TO47 != null) {
                                        Ams.DspCfgDataExtend_32_TO_47 = loadCfgData.CFGDATAEXT32TO47;
                                    }
                                }
                                if (Ams.isHasDtsModule()) {
                                    Ams.DtsSrcCfgData = loadCfgData.DTSSCD;
                                }
                                if (Ams.isInputEQExist()) {
                                    if (loadCfgData.BASEINCFGDATA != null) {
                                        if (Ams.isHasA2BRoute()) { //支持A2B源的机型中，部分机型的输入源EQ从5段扩展为9段，导入时需要进行处理；A2B源音量值也进行导入兼容处理。
                                            Ams.checkRepairBaseInputsCfgData(loadCfgData.BASEINCFGDATA);
                                            Ams.setAllChA2BInputVolumeToDB(loadCfgData.BASEINCFGDATA); //用当前数据库值修改从配置导入的A2B源音量值，避免刚导入后界面显示的A2B源音量值不正确
                                            srcLength = loadCfgData.BASEINCFGDATA.A2B[0].standardEq.shift_freq.length;
                                            desLength = Ams.DspBaseInputsCfgData.A2B[0].standardEq.shift_freq.length;
                                            count = Ams.getDynamicAllBaseSrcLength();
                                            //console.log("srcLength = " + srcLength + ", desLength = " + desLength);
                                            //console.log("1--DspBaseInputsCfgData: " + JSON.stringify(loadCfgData.BASEINCFGDATA));
                                            var srcFreqBands = Ams.getFreqBands(srcLength);
                                            var desFreqBands = Ams.getFreqBands(desLength);
                                            if (srcLength < desLength) {
                                                var tailZero = [];
                                                var tailQ = [];
                                                var tailS = [];

                                                for (i = srcLength; i < desLength; i++) {
                                                    tailZero.push(0);
                                                    tailQ.push(4.0);
                                                    tailS.push(1.0);
                                                }
                                                for (i = 0; i < count; i++) {
                                                    srcCfgData = Ams.getStandardInputEqCfgDataByChannelIdxByDB(i, loadCfgData.BASEINCFGDATA);
                                                    srcCfgData.type.push.apply(srcCfgData.type, tailZero);
                                                    for (var j = 0; j < srcLength; j++) {
                                                        srcCfgData.shift_freq[j] = srcFreqBands[j] + srcCfgData.shift_freq[j] - desFreqBands[j];
                                                    }
                                                    srcCfgData.shift_freq.push.apply(srcCfgData.shift_freq, tailZero);
                                                    srcCfgData.gain.push.apply(srcCfgData.gain, tailZero);
                                                    srcCfgData.Q.push.apply(srcCfgData.Q, tailQ);
                                                    srcCfgData.S.push.apply(srcCfgData.S, tailS);
                                                }
                                            } else if (srcLength > desLength) {
                                                for (i = 0; i < count; i++) {
                                                    srcCfgData = Ams.getStandardInputEqCfgDataByChannelIdxByDB(i, loadCfgData.BASEINCFGDATA);
                                                    srcCfgData.type = srcCfgData.type.slice(0, desLength);
                                                    srcCfgData.shift_freq = srcCfgData.shift_freq.slice(0, desLength);
                                                    for (var j = 0; j < desLength; j++) {
                                                        srcCfgData.shift_freq[j] = srcFreqBands[j] + srcCfgData.shift_freq[j] - desFreqBands[j];
                                                    }
                                                    srcCfgData.gain = srcCfgData.gain.slice(0, desLength);
                                                    srcCfgData.Q = srcCfgData.Q.slice(0, desLength);
                                                    srcCfgData.S = srcCfgData.S.slice(0, desLength);
                                                }
                                            }
                                            //console.log("2--DspBaseInputsCfgData: " + JSON.stringify(loadCfgData.BASEINCFGDATA));
                                        }

                                        Ams.DspBaseInputsCfgData = loadCfgData.BASEINCFGDATA;
                                    }
                                }

                                /* 对数据库中的输入源配置进行兼容性转换处理 */
                                if (loadCfgData.VERSION !== undefined && Ams.versionCmp(loadCfgData.VERSION, "2.0.x") >= 0) {
                                    if (!Ams.isConfigSourceBydB()) {
                                        //isMatch = false;
                                        Ams.transSourcesFromDBToPercent();
                                    }
                                } else {
                                    if (Ams.isConfigSourceBydB()) {
                                        //isMatch = false;
                                        Ams.transSourcesFromPercentToDB();
                                    }
                                }

//                                if (!isMatch) {
//                                    busyView.hide();
//                                    msgbox_pwd_err.text=qsTr("配置文件与设备输入源配置不兼容！")
//                                    msgbox_pwd_err.title=qsTr("文件解析错误");
//                                    msgbox_pwd_err.isNeedOpenPasswdInputFrame = false;
//                                    msgbox_pwd_err.visible=true;
//                                    return;
//                                }

                                Ams.setEqCorrMode(loadCfgData.ECM);
                                Ams.setVolCorrMode(loadCfgData.VCM);
//                                if (loadCfgData.FCM != null) {
//                                    Ams.setFiltersCorrelationMode(loadCfgData.FCM);
//                                }
                                if (Ams.getFiltersCorrelationMode() != "non") {
                                    Ams.setFiltersCorrelationMode((Ams.getEqCorrMode() != "non" ? Ams.getEqCorrMode() : "rel"));
                                }
                                if (Ams.isHasAnalogInputAlias() || Ams.isHasAnalogInputPhase()) {
                                    if (loadCfgData.ASCDATA != null) {
                                        Ams.AnalogSrcCfgData = loadCfgData.ASCDATA;
                                        for (var i = Ams.AnalogSrcCfgData.length; i < 24; i++) {
                                            Ams.AnalogSrcCfgData.push({aliasIdx:-1, phase:-1});
                                        }
                                    }
                                }

                                timer_meter.setMeterEnable(false); //关闭增益检测

                                if (Ams.isHasSpdifRoute()) {
                                    Ams.setCurrentDigitalSrcType(loadFile, loadCfgData.CDST);
                                }
                                if (Ams.isHasRemixModeOptions()) {
                                    if (loadCfgData.RM != null) {
                                        if (!Ams.isHasSoundCardRoute() && loadCfgData.RM == 4) {
                                            Ams.setRemixMode(loadFile, 2); //设备无USB声卡，却设置为声卡优先，则切为经典模式
                                        } else {
                                            Ams.setRemixMode(loadFile, loadCfgData.RM);
                                        }
                                    }

                                    if (Ams.isHasA2BRoute()) {
                                        if (loadCfgData.NA2BRG != null) Ams.setNonA2BReduceGain(loadFile, loadCfgData.NA2BRG);
                                        if (loadCfgData.A2BS != null) Ams.setA2BSensitivity(loadFile, loadCfgData.A2BS);
                                        if (loadCfgData.A2BR != null) Ams.setA2BReleaseTime(loadFile, loadCfgData.A2BR);
                                    } else {
                                        if (loadCfgData.NARG != null) Ams.setNonAnalogReduceGain(loadFile, loadCfgData.NARG);
                                        if (loadCfgData.AS != null) Ams.setAnalogSensitivity(loadFile, loadCfgData.AS);
                                        if (loadCfgData.AR != null) Ams.setAnalogReleaseTime(loadFile, loadCfgData.AR);
                                    }

                                    if (Ams.isAdjustableSoundCardFirstExist()) {
                                        if (loadCfgData.SCS != null) Ams.setSoundCardSensitivity(loadFile, loadCfgData.SCS);
                                        if (loadCfgData.SCR != null) Ams.setSoundCardReleaseTime(loadFile, loadCfgData.SCR);
                                    }

                                    if (Ams.isAdjustableBluetoothFirstExist()) {
                                        if (loadCfgData.BS != null) Ams.setBluetoothSensitivity(loadFile, loadCfgData.BS);
                                        if (loadCfgData.BR != null) Ams.setBluetoothReleaseTime(loadFile, loadCfgData.BR);
                                    }

                                    if (Ams.isAdjustablePlayerFirstExist()) {
                                        if (loadCfgData.DS != null) Ams.setDigitalSensitivity(loadFile, loadCfgData.DS);
                                        if (loadCfgData.DR != null) Ams.setDigitalReleaseTime(loadFile, loadCfgData.DR);
                                    }

                                    if (Ams.isHasSpdifRoute()) {
                                        if (Ams.isAdjustablePlayerFirstExist()) {
                                            if (loadCfgData.SS != null) Ams.setSpdifSensitivity(loadFile, loadCfgData.SS);
                                            if (loadCfgData.SR != null) Ams.setSpdifReleaseTime(loadFile, loadCfgData.SR);
                                        } else {
                                            if (loadCfgData.DS != null) Ams.setDigitalSensitivity(loadFile, loadCfgData.DS);
                                            if (loadCfgData.DR != null) Ams.setDigitalReleaseTime(loadFile, loadCfgData.DR);
                                        }

                                        //if (loadCfgData.DP != null) Ams.setDigitalPriority(loadFile, loadCfgData.DP);
                                    }
                                }

                                Ams.setSumGraphDisplayFlags(loadCfgData.ISGD);
                                row_menu.current_cfg_file=file;

                                if (Ams.isHasDtsModule()) {
                                    if (Ams.getDeviceType() === Ams.GSR1) {
                                        Ams.setDtsInputType(loadFile, loadCfgData.DTSIT);
                                        Ams.setDtsPcmMode(loadFile, loadCfgData.DTSPCM);
                                        Ams.setDtsBassMode(loadFile, loadCfgData.DTSBASS);
                                    }
                                    Ams.setDtsEnabled(loadFile, loadCfgData.DTSEN);
                                    Ams.setDtsOutputType(loadFile, loadCfgData.DTSOT);

                                    //Ams.DtsSrcCfgData = loadCfgData.DTSSCD;
                                    Ams.setAllDtsSrcsByDB(loadFile);
                                    Ams.setAllDtsRoutingSrcsByDB(loadFile); //设置设备所有路由3(即DTS路由)输入源
                                }

                                if (Ams.isVSRxSeriesDevice()) {
                                    Ams.setDsdOutputType(loadFile, loadCfgData.DSDOT);
                                }

                                if (Ams.isHasHdmiPlayStateSwitch()) {
                                    if (loadCfgData.HPS != null) Ams.setHdmiPlayState(loadFile, loadCfgData.HPS);
                                }

                                if (Ams.isHasDspBypassModule()) {
                                    Ams.setDspBypass(loadFile, loadCfgData.DSPBYPASS);
                                }

                                if (Ams.isHasOutputBridgeJointModule()) {
                                    if (loadCfgData.OBJ != null) Ams.setAllOutputBridgeJoint(loadFile, loadCfgData.OBJ); //输出通道桥接开关列表
                                }

                                if (Ams.isNoiseThresholdExist()) {
                                    if (loadCfgData.NTRT != null) Ams.setNoiseThresholdReleaseTime(loadFile, loadCfgData.NTRT); //噪声门限释放延时时间
                                    if (loadCfgData.NTS != null) Ams.setNoiseThresholdSensitivity(loadFile, loadCfgData.NTS); //噪声门限灵敏度
                                }

                                if (Ams.isDacFilterShapeExist()) {
                                    if (loadCfgData.DFS != null) Ams.setDacFilterShape(loadFile, loadCfgData.DFS); //ESS DAC 滤波器值
                                }

                                if (Ams.isHasA2BRoute()) {
                                    if (Ams.isOriginalCarEqExist()) {
                                        if (loadCfgData.OriginalCarEqEnable != null) Ams.setOriginalCarEqEnable(loadFile, loadCfgData.OriginalCarEqEnable);
                                    }
                                    if (Ams.isSoundFieldBalanceExist()) {
                                        if (loadCfgData.SoundFieldBalanceEnable != null) Ams.setSoundFieldBalanceEnable(loadFile, loadCfgData.SoundFieldBalanceEnable);
                                    }
                                }

                                if (Ams.isHasKaraokeRoute()) {
                                    if (loadCfgData.KKM != null) Ams.setKaraokeMode(loadFile, loadCfgData.KKM); //卡拉OK输出模式
                                    if (loadCfgData.KAS != null && Ams.isCanSwitchAccompanySource()) Ams.setAccompanySource(loadFile, loadCfgData.KAS); //卡拉OK伴奏音源
                                    if (loadCfgData.KKMG != null) Ams.setAllKaraokeMixerGain(loadFile, loadCfgData.KKMG); //卡拉OK输出增益
                                    if (loadCfgData.KMIMG != null) Ams.setAllMicInputMixerGain(loadFile, loadCfgData.KMIMG); //MIC输入增益
                                    if (loadCfgData.KMEFG != null) Ams.setAllMicEchoFeedbackGain(loadFile, loadCfgData.KMEFG); //MIC ECHO反馈音量
                                    if (loadCfgData.KMEMG != null) Ams.setAllMicEchoMixerGain(loadFile, loadCfgData.KMEMG); //MIC ECHO混响增益
                                    if (loadCfgData.KMEFD != null) Ams.setMicEchoFeedbackDelay(loadFile, loadCfgData.KMEFD); //MIC ECHO混响延时（单位：毫秒）
                                    if (loadCfgData.KMMRD != null) Ams.setMicMixerReadyDelay(loadFile, loadCfgData.KMMRD); //MIC混响预延时（单位：毫秒）
                                    if (loadCfgData.KMR != null) Ams.setAllMicReverb(loadFile, loadCfgData.KMR);//MIC混响参数
                                    if (loadCfgData.KML != null) Ams.setAllChKaraokeFilter(loadFile, "MicLowpass", loadCfgData.KML); //MIC低通滤波器
                                    if (loadCfgData.KMH != null) Ams.setAllChKaraokeFilter(loadFile, "MicHighpass", loadCfgData.KMH); //MIC高通滤波器
                                    if (loadCfgData.KMSF != null) Ams.setAllMicFreq(loadFile, loadCfgData.KMSF); //MIC频点相对值
                                    if (loadCfgData.KMG != null) Ams.setAllMicGain(loadFile, loadCfgData.KMG); //MIC增益
                                    if (loadCfgData.KMQ != null) Ams.setAllMicQ(loadFile, loadCfgData.KMQ); //MIC Q值
                                }

                                if (Ams.isHasSurroundRoute()) {
                                    if (Ams.getSurroundSrcLength() > 6) {
                                        if (loadCfgData.FrontSurroundEnhanceEnable != null) Ams.setFrontSurroundEnhanceEnable(loadFile, loadCfgData.FrontSurroundEnhanceEnable); //天空全景声前环绕增强使能状态
                                        if (loadCfgData.RearSurroundEnhanceEnable != null) Ams.setRearSurroundEnhanceEnable(loadFile, loadCfgData.RearSurroundEnhanceEnable); //天空全景声后环绕增强使能状态
                                    } else {
                                        if (loadCfgData.SurroundEnhanceEnable != null) Ams.setSurroundEnhanceEnable(loadFile, loadCfgData.SurroundEnhanceEnable); //天空全景声环绕增强使能状态
                                    }
                                    if (Ams.getSurroundSrcLength() > 2) {
                                        if (loadCfgData.SubHarmEnable != null) Ams.setSubHarmEnable(loadFile, loadCfgData.SubHarmEnable); //低音谐波使能状态
                                        if (loadCfgData.SoundFiledExpandEnable != null) Ams.setSoundFiledExpandEnable(loadFile, loadCfgData.SoundFiledExpandEnable); //声场扩展立体声使能状态
                                        if (loadCfgData.SoundFiledExpandCutFreq != null) Ams.setSoundFiledExpandCutFreq(loadFile, loadCfgData.SoundFiledExpandCutFreq); //声场扩展模块截止频率（范围：500~2000Hz，步进：100Hz）
                                        if (loadCfgData.SoundFiledExpandGain != null) Ams.setSoundFiledExpandGain(loadFile, loadCfgData.SoundFiledExpandGain); //声场扩展模块增益（范围：-12dB/-9dB/-6dB/-1dB）
                                        if (loadCfgData.TrebleBoostEnable != null) Ams.setTrebleBoostEnable(loadFile, loadCfgData.TrebleBoostEnable); //高音增强使能状态
                                        if (loadCfgData.TrebleBoostGain != null) Ams.setTrebleBoostGain(loadFile, loadCfgData.TrebleBoostGain); //高音增强增益
                                        if (loadCfgData.CenterEnhanceEnable != null) Ams.setCenterEnhanceEnable(loadFile, loadCfgData.CenterEnhanceEnable); //中置增强使能状态
                                        if (loadCfgData.CenterTrebleBoostEnable != null) Ams.setCenterTrebleBoostEnable(loadFile, loadCfgData.CenterTrebleBoostEnable); //中置高音增强使能状态
                                        if (loadCfgData.CenterTrebleBoostGain != null) Ams.setCenterTrebleBoostGain(loadFile, loadCfgData.CenterTrebleBoostGain); //中置高音增强增益
                                        if (loadCfgData.BassBoostEnable != null) Ams.setBassBoostEnable(loadFile, loadCfgData.BassBoostEnable); //低音增强使能状态
                                        if (loadCfgData.BassBoostFreq != null) Ams.setBassBoostFreq(loadFile, loadCfgData.BassBoostFreq); //低音增强截止频率（范围：20~60Hz，步进：1Hz）
                                        if (loadCfgData.BassBoostGain != null) Ams.setBassBoostGain(loadFile, loadCfgData.BassBoostGain); //低音增强增益（范围：0dB/+3dB/+6dB/+9dB）
                                    }
                                    if (loadCfgData.SurroundInputSrcCfgData != null) { Ams.SurroundInputSrcCfgData = loadCfgData.SurroundInputSrcCfgData; Ams.setAllSurroundInputCfgByDB(loadFile); }; //天空全景声输入源配置
                                }

                                if (Ams.isInputDLCExist()) {
                                    if (loadCfgData.DspBaseInputsDlcCfgData != null) { Ams.DspBaseInputsDlcCfgData = loadCfgData.DspBaseInputsDlcCfgData; Ams.setAllInputDlcCfgByDB(loadFile); }; //天空全景声输入源配置
                                }

                                Ams.checkRepairDataBase(); //同步前使数据库格式保持在最新版本上(避免数据库访问报错)
                                lastCmdIndex = Ams.setAllCfgDataByDB(loadFile, ignoreBluetoothSrc, loadCfgData.DTV2, loadCfgData.HW); //将所有输出通道配置写入设备

                                if (loadCfgData.MAINVOL != null) lastCmdIndex = Ams.setMainVolume(loadFile, loadCfgData.MAINVOL); //主音量

                                if (Ams.isDebug || Ams.isDemoMode()) {
                                    timer_delay_refresh.start();
                                }
                            }else{
                                busyView.hide();

                                if (loadCfgData.DTV2 != null) {
                                    if (loadCfgData.VERSION !== undefined && Ams.versionCmp(loadCfgData.VERSION, adaptableVersion) > 0) {
                                        msgbox_pwd_err.text=qsTr("配置文件版本与当前调音软件不匹配！") + "(V" + loadCfgData.VERSION + ")";
                                    } else if (Ams.isMatchDeviceType(loadCfgData.DTV2)) {
                                        msgbox_pwd_err.text=qsTr("配置文件与设备路由配置不兼容！");
//                                    } else if (!isA2BModelMatch) {
//                                        msgbox_pwd_err.text=qsTr("配置文件与当前车型不匹配！") + "(" + qsTr("车型代码：") + Ams.A2BMainModelID + "." + Ams.A2BSubModelID + ")";
                                    } else {
                                        msgbox_pwd_err.text=qsTr("配置文件与当前设备不匹配！");
                                    }
                                } else {
                                    msgbox_pwd_err.text=qsTr("配置文件版本与当前设备不匹配！");
                                }

                                msgbox_pwd_err.title=qsTr("文件解析错误");
                                msgbox_pwd_err.isNeedOpenPasswdInputFrame = false;
                                msgbox_pwd_err.visible=true;
//                                root.cfg="unknown"
                                if (isLastestMeterEnabled) {
                                    timer_meter.setMeterEnable(true); //开启增益检测
                                }
                                return;
                            }
                        }
                        catch(e){
                            console.log(e.name + "---:---" + e.message);
                            busyView.hide();
                            if (isLoadTempFile) {
                                toast.show(qsTr("文件解析错误"));
                            } else {
                                msgbox_pwd_err.title=qsTr("文件解析错误");
                                msgbox_pwd_err.text=qsTr("密码输入错误！")
                                msgbox_pwd_err.visible=true;
                            }
//                            root.cfg="unknown"
                            //throw e;
                            if (isLastestMeterEnabled) {
                                timer_meter.setMeterEnable(true); //开启增益检测
                                return;
                            }
                        }
                    }
                }

                function handleData(cmdIdx, strRet) {
                    if (cmdIdx === lastCmdIndex) {
                        lastCmdIndex = -1;
                        timer_delay_refresh.start();
                    }
                }

                onAccepted: {
                    console.log("---------onAccepted---------");
                    //busyView.show("载入中，请稍候...");
                    file=fileUrl;
                    file=file.substring(8);//substract 'file:///'
                    if (isLoadTempFile) {
                        parseFile(file, "11111111");
                    } else {
                        loadFile.savedFolder = saveFile.folder = fileDialog_load_mode.folder = fileDialog_save_mode.folder = fileUrl.toLocaleString().substring(0, fileUrl.toLocaleString().lastIndexOf('/')); //必须赋值一次，否则再次弹出时目录不切换，是Qt的Bug？
                        parseFile(file, row_menu.password);
                    }
                    //row_menu.current_cfg_file=file;
                    //busyView.hide();
                }
                onRejected: {
                    console.log("---------onRejected---------");
                    console.log("Canceled")
                }
            }
            Timer {
                id: timer_delay_refresh
                interval: 1
                repeat: false
                triggeredOnStart: false

                onTriggered: {
                    stop();
                    Ams.checkRepairInputSources(); //同步后使输入源排序规范化
                    Ams.checkRepairCurrentMaster(); //同步后要使主通道值保持在有输入源的通道上
                    grahp_frame.rePaintAllGraph(); //同步完成后重绘“主界面”所有图形
                    ioInputEQ.rePaintAllGraph(); //同步完成后重绘输入源EQ所有图形
                    row_vol_corrMode.updateView(); //刷新音量联动模式选中状态
                    row_eq_corrMode.updateView(); //刷新均衡联动模式选中状态
                    grahp_frame.updateViewOfFiltersLinkMode(); //刷新高低通分频联动模式
                    root.updateView(); //刷新大部分界面内容
                    //io.refreshAllInputDLCGraphData(); //刷新所有输入通道动态等响度调节(DLC)图形数据

                    row_menu.refresh_world=!row_menu.refresh_world;
                    busyView.hide();
                }
            }
            DspMessageDialog {
                id:msgbox_pwd_err
                title: ""
                icon: StandardIcon.Question
                text: ""
                standardButtons: StandardButton.Yes
                property bool isNeedOpenPasswdInputFrame: true
                onYes:{
                    if (isNeedOpenPasswdInputFrame) {
                        passwd_input_frame.title=qsTr("请输入密码：")
                        passwd_input_frame.call_back_target=loadFile;
                        passwd_input_frame.open();
                    }
                    isNeedOpenPasswdInputFrame = true;
                }
            }
            DspMessageDialog {
                id:msgbox
                title: ""
                icon: StandardIcon.Question
                text: ""
                standardButtons: StandardButton.Yes
                onYes: console.log("ok")
            }
            Popup {
                id:passwd_input_frame;
                x: (root.width-width)/ 2
                y: (root.height-height)/2
//                closePolicy:Popup.NoAutoClose
                // width: Math.min(root.width, root.heigh) / 3 * 2
                implicitWidth: (settings.lang == "pt" || settings.lang == "es") ? 400 : 344
                implicitHeight: 145
                //leftMargin: 21
                modal: true
                background:Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }

                    /* 用于阻止光标变成底层窗口的输入框光标、拖动光标等 */
                    MouseArea {
                        anchors.fill: parent
                        enabled: passwd_input_frame.visible
                    }
                }
                onOpened: {
                    io.isToolTipVisibleEnabled = false;
                    input_passwd.forceActiveFocus();
                }
                onClosed: {
                    io.isToolTipVisibleEnabled = true;
                }
                property var title:""
                //focus: true
                property var call_back_target;
                contentItem: ColumnLayout {
                    id: settingsColumn
                    //spacing: 25
                    //anchors.fill: parent
                    Rectangle {
                        id:input_txt
                        height: 36
//                        width:200
//                        spacing: 10
                        anchors.left: parent.left
                        anchors.leftMargin: 40
                        anchors.top: parent.top
                        anchors.topMargin: 30
                        Label {
                            id: item_label
                            anchors.top: parent.top
                            anchors.left: parent.left
                            text: passwd_input_frame.title;
                            font.bold: settings.fontBold
                            font.pixelSize: 14
                            color: "#90bcea"
                        }
                        TextField {
                            id: input_passwd
                            width: (settings.lang == "pt" || settings.lang == "es") ? 145 : 120
                            height: 36
                            anchors.verticalCenter: item_label.verticalCenter
                            anchors.left: item_label.right
                            anchors.leftMargin: 3
                            maximumLength: 8
                            color: text.length > 0?"#90bcea":"#495458"
                            placeholderText:'<font size="12px">'+(settings.fontBold?'<strong>':'')+ qsTr("请输入8位密码")+(settings.fontBold?'</strong>':'')+'</font>'
                            echoMode:TextInput.Password
                            verticalAlignment: Text.AlignVCenter
//                            validator: RegExpValidator{regExp:/[A-Za-z0-9_]+/}
                            selectByMouse: true
                            background: Rectangle{
                                id:tx_bg
                                width: parent.width
                                height: parent.height
                                gradient: Gradient {
                                    GradientStop { position: 0 ; color: "#0e151e" }
                                    GradientStop { position: 1 ; color:"#314a68" }
                                }
//                                color: "yellow"
                                border.width: 1
                                border.color: "#4b5359"
                            }
                        }
                    }

                    AmsButton4 {
                        anchors.top:input_txt.bottom
                        anchors.topMargin: 15
                        anchors.left: parent.left
                        anchors.leftMargin: (settings.lang == "pt" || settings.lang == "es") ? 85 : 67
                        width: (settings.lang == "pt" || settings.lang == "es") ? 70 : 60
                        id: okButton
                        txt:qsTr("确认")
                        onClicked: {
                            if(input_passwd.text.length!=8)
                            {
                                msgbox.title=qsTr("密码错误");
                                msgbox.text=qsTr("密码位数不少于8位！")
                                msgbox.visible=true;
                                return;
                            }
                            row_menu.password=input_passwd.text;
                            if(passwd_input_frame.call_back_target!=null)
                                passwd_input_frame.call_back_target.intputEnd();
                            passwd_input_frame.close();
                        }
                    }
                    AmsButton4 {
                        id: cancelButton
                        anchors.top: okButton.top
                        anchors.left: okButton.right
                        anchors.leftMargin: 57
                        width: (settings.lang == "pt" || settings.lang == "es") ? 70 : 60
                        txt: qsTr("取消")
                        onClicked: {
                            console.log("cancel:");
                            passwd_input_frame.close();
                        }
                    }
                    Keys.onTabPressed: {
                        console.log("passwd_input_frame Keys.onTabPressed");
                    }
                    Keys.onSpacePressed: {
                        console.log("passwd_input_frame Keys.onSpacePressed");
                    }
                    Keys.onEscapePressed: {
                        passwd_input_frame.close();
                    }
                }
            }
            Rectangle{
                id:load_grp
                anchors.left: parent.left
                anchors.top: parent.top
                anchors.leftMargin: 13
                anchors.topMargin: 8
                height: 22
                width: 260
                color: "#1b2833"
                border.color:"#000000"
                AmsButton2{
                    id:load_button
                    txt:qsTr("载入")
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.left: parent.left
                    anchors.leftMargin: -2
                    width: (settings.lang == "pt" || settings.lang == "es") ? 60 : 54
                    //tooltip: qsTr("载入已有配置")
                    onClicked: {
                        /* 已进行自动切换模式绑定的模式不允许操作 */
                        if (Ams.isModeAutoSwitchExist()) {
                            var curModePair = Ams.getModeAutoSwitchPair();
                            if ((curModePair[0] < 8 && curModePair[1] < 8)) {
                                var activeMode = Ams.getActiveConfigMode();
                                if (curModePair.some(function(item) { return activeMode === item; })) {
                                    toast.show(qsTr("请先解除自动切换模式绑定！"));
                                    return;
                                }
                            }
                        }

                        load_menu.isReduced = !Ams.isModeTransExist();
                        load_menu.open();
                        console.log("load callback is called");
                    }

                    AmsMenu {
                        id: load_menu
                        width: ((settings.lang == "pt" || settings.lang == "es") ? 203 : (settings.lang == "cn" ? 110 : 180))
                        model: isReduced ? [qsTr("单个配置数据"), qsTr("恢复备份数据")] : [qsTr("单个配置数据"), qsTr("恢复备份数据"), qsTr("所有模式数据")]
                        property bool isReduced: false

                        onSelected: {
                            //console.log("onSelected: " + itemIndex);
                            switch (itemIndex) {
                            case 0: //单个配置数据
                                loadFile.isLoadTempFile = false;
                                loadFile.visible=true;
                                break;
                            case 1: //恢复备份数据
                                loadFile.isLoadTempFile = true;
                                loadFile.visible=true;
                                break;
                            case 2: //所有模式数据
                                reset_warning_frm.callbackHandler = reset_warning_frm.openLoadModeDialog;
                                reset_warning_frm.openWithPolicy(Popup.CloseOnEscape | Popup.CloseOnPressOutside);
                                break;
                            }
                        }
                    }
                }
                Label{
                    id:current_cfg_file
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.left: load_button.right
                    anchors.leftMargin:5
                    width: parent.width - load_button.width - 2
                    elide: Text.ElideRight //省略超出显示范围的文字
                    text:/*qsTr("当前配置文件:")+*/row_menu.current_cfg_file.substring(row_menu.current_cfg_file.lastIndexOf("/")+1)
                    font.bold: settings.fontBold
                    font.pixelSize: 12
                    color: "#fefefe"
//                    ToolTip.delay: 500
//                    ToolTip.timeout: 5000
//                    ToolTip.text: row_menu.current_cfg_file;
//                    MouseArea {
//                        anchors.fill: parent
//                        hoverEnabled: true;
//                        onEntered: {
//                            parent.ToolTip.visible = true;
//                        }
//                        onExited: {
//                            parent.ToolTip.visible = false;
//                        }
//                    }
                }
            }
            AmsButton2{
                id:save_to_pc
                anchors.left: load_grp.right;
                anchors.leftMargin:11;
                anchors.top: load_grp.top;
                width: (settings.lang == "pt" || settings.lang == "es") ? 60 : 54
                txt:qsTr("导出");
                //tooltip:qsTr("保存当前配置到PC");
                signal intputEnd();
                onIntputEnd: {
                    passwd_input_frame.call_back_target=null;
                    //console.log("user password:"+local_root.password);
                    saveFile.visible=true;
                }
                onClicked:
                {
                    if (Ams.isModeTransExist()) {
                        save_menu.open();
                    } else {
                        passwd_input_frame.title=qsTr("设置保护密码：")
                        passwd_input_frame.call_back_target=save_to_pc;
                        passwd_input_frame.open();
                    }
                }

                AmsMenu {
                    id: save_menu
                    width: (settings.lang == "pt" ? 200 : (settings.lang == "es" ? 220 : (settings.lang == "cn" ? 110 : 188)))
                    model: [qsTr("当前配置数据"), qsTr("所有模式数据")]

                    onSelected: {
                        //console.log("onSelected: " + itemIndex);
                        switch (itemIndex) {
                        case 0: //当前配置数据
                            passwd_input_frame.title=qsTr("设置保护密码：")
                            passwd_input_frame.call_back_target=save_to_pc;
                            passwd_input_frame.open();
                            break;
                        case 1: //所有模式数据
                            var modeList = Ams.getValidConfigModes();
                            if (modeList.length < 1) {
                                toast.show(qsTr("模式列表为空！"));
                                return;
                            }

                            if (Ams.isDebug || Ams.isDemoMode()) {
                                toast.show(qsTr("未连接设备！"));
                                return;
                            }

                            passwd_input_frame.title=qsTr("设置保护密码：")
                            passwd_input_frame.call_back_target=fileDialog_save_mode;
                            passwd_input_frame.open();
                            break;
                        }
                    }
                }
            }
            Rectangle{
                id:split_line
                anchors.top: row_menu.top
                anchors.topMargin: 0
                anchors.left: save_to_pc.right
                anchors.leftMargin: 11
                height: row_menu.height
                width: 1
                border.width: 1
                border.color: "#748590"
                color: "#748590"
            }

//            WinReset{
//                id:reset_win
//                x: (root.width-width)/ 2
//                y: (root.height-height)/2
//                //checkName:root.getOutputNames()
//                onBusyStateChanged: {
//                    if (isBusy) {
//                        close();
//                        busyView.show(tip);
//                    } else {
//                        Ams.checkRepairCurrentMaster(); //同步后要使主通道值保持在有输入源的通道上
//                        grahp_frame.rePaintAllGraph(); //同步完成后重绘“主界面”所有图形
//                        ioInputEQ.rePaintAllGraph(); //同步完成后重绘输入源EQ所有图形
//                        root.updateView(); //刷新大部分界面内容
//                        io.refreshAllInputDLCGraphData(); //刷新所有输入通道动态等响度调节(DLC)图形数据
//                        busyView.hide();
//                    }
//                }
//            }

            DspMessageDialog {
                id: msgbox_reset_all
                title: qsTr("复位")
                text: qsTr("设备当前配置将被复位为默认值，确认继续？")
                standardButtons: StandardButton.Yes |StandardButton.No
                icon: StandardIcon.Warning
                property var lastestCmdIdx: -1

                onYes: {
                    busyView.show(qsTr("复位中，") + qsTr("请稍候..."));
                    lastestCmdIdx = Ams.resetAllCurrentConfigs(msgbox_reset_all);

                    if (Ams.isDebug || Ams.isDemoMode()) handleData(lastestCmdIdx, "");
                }

                function handleData(cmdIdx, strRet) {
                    if (cmdIdx === lastestCmdIdx) {
                        lastestCmdIdx = -1;
                        Ams.checkRepairCurrentMaster(); //同步后要使主通道值保持在有输入源的通道上
                        grahp_frame.rePaintAllGraph(); //同步完成后重绘“主界面”所有图形
                        ioInputEQ.rePaintAllGraph(); //同步完成后重绘输入源EQ所有图形
                        root.updateView(); //刷新大部分界面内容
                        //io.refreshAllInputDLCGraphData(); //刷新所有输入通道动态等响度调节(DLC)图形数据
                        busyView.hide();
                    }
                }

            }

            AmsButton3{
                id:reset_button
                anchors.left: split_line.right
                anchors.top: load_grp.top
                anchors.leftMargin: getTimeVisible() ? (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14) : 20
//                icon_src:"qrc:///image/images/reset.png"
                txt:qsTr("复位")
                //iconsrc:selected?"qrc:///image/images/signal_on.png":"qrc:///image/images/signal.png"
                //tooltip: qsTr("快速复位")
                onClicked: {
                    console.log("reset button pressed")
                    //reset_win.open();
                    msgbox_reset_all.open();
                }
            }

            WinModes{
                id:modes_win
                x: (root.width-width)/ 2
                y: (root.height-height)/2
                onToast: {
//                    close();
                    toast.show(tip);
                }
                onBusyStateChanged: {
                    if (isBusy) {
                        close();
                        busyView.show(tip);
                    } else {
                        if (isLoad) {
                            Ams.checkRepairDataBase(); //同步后使数据库格式保持在最新版本上
                            Ams.checkResetGroup(); //同步后重置没有源的输出通道分组
                            Ams.checkRepairInputSources(); //同步后使输入源排序规范化
                            grahp_frame.rePaintAllGraph(); //同步完成后重绘“主界面”所有图形
                            ioInputEQ.rePaintAllGraph(); //同步完成后重绘输入源EQ所有图形
                            root.updateView(); //刷新大部分界面内容
                            //io.refreshAllInputDLCGraphData(); //刷新所有输入通道动态等响度调节(DLC)图形数据
                        }
                        busyView.hide();
                    }
                }
                onSaveYese:{
                    console.log("--------------onSaveYese-----------------");
                    hidIO.isChange=false;
                    modes_button.txt = qsTr("模式") + ((Ams.getActiveConfigMode() > -1)?(" " + (Ams.getActiveConfigMode() + 1)):""); //刷新模式按钮文本
                }
            }
            WinModePairs {
                id:modes_pair_win
                x: (root.width-width)/ 2
                y: (root.height-height)/2
                onToast: {
//                    close();
                    toast.show(tip);
                }

                onBusyStateChanged: {
                    if (isBusy) {
                        busyView.show(tip);
                    } else {
                        close();
                        busyView.hide();
                    }
                }

                onClosed: {
                    modes_win.forceActiveFocus();
                }
            }
            WinModeAutoSwitch {
                id:modes_auto_switch_win
                 onToast: {
//                    close();
                    toast.show(tip);
                }

                onBusyStateChanged: {
                    if (isBusy) {
                        busyView.show(tip);
                    } else {
                        close();
                        busyView.hide();
                    }
                }
                onClosed: {
                    modes_win.forceActiveFocus();
                }
            }
            AmsButton3{
                id:modes_button
                anchors.top: load_grp.top
                anchors.left: reset_button.right
                anchors.leftMargin: getTimeVisible() ? (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14) : 24
                //                icon_src:"qrc:///image/images/mode.png"
                txt:qsTr("模式")
                //tooltip: qsTr("管理设备的各种模式")
                onClicked: {
                    modes_win.open();
                }
            }

            //            AmsButton2{
            //                id:update_button
            //                property var cur_ver: 1.0 //version of current application
            //                property var new_ver: null;
            //                property var new_app_name:"dsp.exe";
            //                property var app_url: "http://192.168.4.209/rd2/SOLO/test/";
            //                property var ver_url: "http://192.168.4.209/rd2/SOLO/test/dsp.ver";
            //                property alias  local_tmp_install_name: download.fileName;
            //                property var xmlhttp: null
            //                txt:qsTr("检查更新")
            //                tooltip: qsTr("检查最新版本")
            //                DspMessageDialog {
            //                    id:msgbox_upgrade
            //                    title: qsTr("Version Checking");
            //                    icon: StandardIcon.Information
            //                    text: qsTr("found new version:"+update_button.new_ver+" Do you want to upgrade?");
            //                    standardButtons: StandardButton.Yes |StandardButton.No
            //                    onYes: {
            //                        console.log("ok");
            //                        //download.fileName="shuaiwen-test.exe";//设置保存目录，pc和安卓不同
            //                        progressBar.visible=true;
            //                        download.httpDownload();
            //                    }
            //                    onNo: {console.log("no");}
            //                }
            //                ZRDownload{
            //                         id:download
            //                         url:update_button.app_url+update_button.new_app_name;
            //                         fileName:"dsp.exe"
            //                         onProgressPosition:progressBar.update(pre) //自定义更新进度条函数
            //                         onError: console.log(msg);
            //                         onDownloadFinished: {
            //                             console.log("download finished");
            //                             progressBar.visible=false;
            //                             install.fileName=fileName;
            //                             install.install();
            //                             //下载完成
            //                         }
            //                     }
            //                ZRInstall {
            //                 id:install;
            //                }
            //                onClicked: {
            //                    console.log("current os type:"+download.osType);
            //                    console.log("check new version");
            //                     xmlhttp=new XMLHttpRequest();
            //                    if (xmlhttp!=null)
            //                      {
            //                      xmlhttp.onreadystatechange=state_Change;
            //                      xmlhttp.open("GET",update_button.ver_url,true);
            //                      xmlhttp.send(null);
            //                      }
            //                    else
            //                      {
            //                      console.log("Your os does not support XMLHTTP.");
            //                      }
            //                }
            //                function state_Change()
            //                {
            //                if (xmlhttp.readyState === XMLHttpRequest.DONE)
            //                  {// 4 = "loaded"
            //                  if (xmlhttp.status==200)
            //                    {// 200 = OK
            //                      console.log("Response = " + xmlhttp.responseText);
            //                      // if response is JSON you can parse it
            //                      var response = JSON.parse(xmlhttp.responseText);
            //                      for(var i=0;i<response.length;i++){
            //                          if(response[i].target!=download.osType)
            //                          {
            //                          console.log("skip unmatched version:"+response[i].target+" wanted:"+download.osType);
            //                          continue;
            //                          }
            //                      update_button.new_ver=response[i].version;
            //                      update_button.new_app_name=response[i].app_name;
            //                      if(parseFloat(update_button.cur_ver)<=parseFloat(update_button.new_ver))
            //                      {
            //                         msgbox_upgrade.visible=true;
            //                      }
            //                      else {
            //                          console.log("already latested"+"current ver:"+update_button.cur_ver+ "  web ver:"+response[i].version);
            //                      }
            //                      }
            //                    }
            //                  else
            //                    {
            //                    alert("Problem retrieving XML data");
            //                    }
            //                  }
            //                //else {console.log("http error:"+xmlhttp.status);}
            //                }

            //            }

            //            ProgressBar {
            //                id: progressBar
            //                value: 0
            //                width: update_button.width*2;
            //                to: 1
            //                anchors.top: update_button.bottom
            //                anchors.topMargin: 8
            //                anchors.horizontalCenter: update_button.horizontalCenter
            //                implicitHeight: 8
            //                visible: false;
            //                function update( v)
            //                {
            //                    console.log("progress:"+v);
            //                value=v;
            //                }
            //            }

            WinLang{
                id:lang_win
                x: (root.width-width)/ 2
                y: (root.height-height)/2
            }
            AmsButton3{
                id:lang_button
                anchors.left: modes_button.visible?modes_button.right:reset_button.right
                anchors.leftMargin: getTimeVisible() ? (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14) : 24
                anchors.top: load_grp.top
                visible: Ams.isLanguageSwitchable()
//                icon_src:"qrc:///image/images/lang.png"

                txt:(Ams.isForInternational() || settings.lang == "cn")?qsTr("Language"):""
                icon_src: (Ams.isForInternational() || settings.lang == "cn")?"":"qrc:/image/images/ic_lang.png"
//                icon_tips: (Ams.isForInternational() || settings.lang == "cn")?"":"qrc:/image/images/ic_lang_tips.png"
                //tooltip: qsTr("Switch to different language")
                DspMessageDialog {
                    id:msg_lang
                    title: "Language Changed"
                    icon: StandardIcon.Question
                    text: "The application must be restart to make change effect, restart now?"
                    btn_yes_txt: "Yes"
                    btn_no_txt: "No"
                    standardButtons: StandardButton.Yes | StandardButton.No
                    onYes: {
                        console.log("issued reboot");
                        root.reboot();
                    }
                    onNo: {
                        console.log(root.isCnLang()+"---------------->"+settings.lang);
                        lang_win.resertLang(settings.lang);
                        lang_button.txt=(Ams.isForInternational() || settings.lang == "cn")?"Language":""
                        lang_button.icon_src=(Ams.isForInternational() || settings.lang == "cn")?"":"qrc:/image/images/ic_lang.png"
                    }
                }
                function switch_end(lang)
                {
                    lang_win.close();
                    if(lang!="")
                    {
                        msg_lang.visible=true;
                    }
                }
                onClicked: {
                    lang_win.caller_id=lang_button;
                    lang_win.open();
                }
            }
            Rectangle{
                id:split_line2
                anchors.top: row_menu.top
                anchors.topMargin: 0
                anchors.left: lang_button.visible ? lang_button.right : (modes_button.visible?modes_button.right:reset_button.right)
                anchors.leftMargin: getTimeVisible() ? (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14) : 20
                height: row_menu.height
                width: 1
                border.width: 1
                border.color: "#748590"
                color:"#748590"
            }
            AmsMenuButton{
                id:io_button

                txt:qsTr("输入输出")
                anchors.left: split_line2.right
                anchors.top: load_grp.top
                anchors.leftMargin: getTimeVisible() ? (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14) : 24
//                iconsrc:selected?"qrc:///image/images/signal_on.png":"qrc:///image/images/signal.png"
                //tooltip: qsTr("输入输出信号关系")
                selected: true;//default
                onSelectedChanged: {
                    if(selected)
                    {
                        btn_input_eq.selected = false;
                        dsp_button.selected=false;
                        setting_button.selected=false;
                        time_button.selected=false;
                        manu_bar_buttons.current_selected=0;

                        var desIdx = 0;
                        switch (Ams.getCurrentOutputsTypeGroup()) {
                        case Ams.AMP_OUTPUTS_GROUP_1:
                            desIdx = 1;
                            break;
                        case Ams.AMP_OUTPUTS_GROUP_2:
                            desIdx = 2;
                            break;
                        }
                        bar_rca_or_amp.updateView(desIdx);
                    }
                }
            }

            AmsMenuButton {
                id: dsp_button
                anchors.left: io_button.right
                anchors.leftMargin: (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14)
                anchors.top: io_button.top
                txt:qsTr("主菜单")
//                iconsrc:selected?"qrc:///image/images/handling_on.png":"qrc:///image/images/handling.png"
                //tooltip: qsTr("信号效果处理")

                onSelectedChanged: {
                    if(selected)
                    {
                        btn_input_eq.selected = false;

                        if (Ams.isDspBypass()) {
                            selected=false;
                            io_button.selected=true;
                            toast.show(qsTr("DSP直通已开启，请关闭后再试。"));
                            return;
                        }

                        if (io.currentOutput >= Ams.getOutputsLength()) { //输出下标超出当前设备最大输出下标的情况
                            io.currentOutput = Ams.getOutputsLength() - 1;
                        }
                        var seq = io.currentOutput;
                        //要确保至少有一组有效io存在，并将主通道设置到第一个发现的通道上。
                        if (!Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(seq))) {
                            seq = Ams.getOutputsLength();
                            for(var i=0;i<Ams.getOutputsLength();i++)
                            {
                                if(Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i))) {
                                    seq = i;
                                    break;
                                }
                            }
                        }
                        if (Ams.isForFactoryTest()) {
                            selected=false;
                            io_button.selected=true;
                            toast.show(qsTr("车间专稿，无此功能。"));
                        } else {
                            if (seq < Ams.getOutputsLength()) {
                                io.currentOutput = seq;
                                Ams.setCurrentOutputMaster(Ams.getOutputCmdLineIdxByViewIdx(seq), true);
                                io_button.selected=false;
                                setting_button.selected=false;
                                time_button.selected=false;
                                manu_bar_buttons.current_selected=1;

                                updChanle();//刷新选中
                            } else {
                                selected=false;
                                io_button.selected=true;
                                toast.show(qsTr("通道还没有配置，请至少先配置一个通道。"));
                            }
                        }

                        var desIdx = 0;
                        switch (Ams.getCurrentOutputsTypeGroup()) {
                        case Ams.AMP_OUTPUTS_GROUP_1:
                            desIdx = 1;
                            break;
                        case Ams.AMP_OUTPUTS_GROUP_2:
                            desIdx = 2;
                            break;
                        }
                        bar_rca_or_amp.updateView(desIdx);
                    }
                }
            }

            AmsMenuButton {
                id: time_button
                anchors.left: dsp_button.right
                anchors.leftMargin: (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14)
                anchors.top: dsp_button.top
                txt:qsTr("时间")
                visible: true
                //tooltip: qsTr("时间")
                onSelectedChanged: {
                    if(selected)
                    {
                        btn_input_eq.selected = false;

                        if (Ams.isDspBypass()) {
                            selected=false;
                            io_button.selected=true;
                            toast.show(qsTr("DSP直通已开启，请关闭后再试。"));
                            return;
                        }

                        var seq = io.currentOutput;
                        //要确保至少有一组有效io存在，并将主通道设置到第一个发现的通道上。
                        if (!Ams.isEnabled(seq)) {
                            seq = Ams.getAllIndepOutputsLength();
                            for(var i=0;i<Ams.getAllIndepOutputsLength();i++)
                            {
                                if(Ams.isEnabled(i)) {
                                    seq = i;
                                    break;
                                }
                            }
                        }
                        if (Ams.isForFactoryTest()) {
                            selected=false;
                            io_button.selected=true;
                            toast.show(qsTr("车间专稿，无此功能。"));
                        } else {
                            if(seq!=Ams.getAllIndepOutputsLength()){
                                io_button.selected=false;
                                setting_button.selected=false;
                                dsp_button.selected=false;
                                manu_bar_buttons.current_selected=3;
                            }
                            else{
                                selected=false;
                                io_button.selected=true;
                                //msgbox.visible=true;
                                toast.show(qsTr("通道还没有配置，请至少先配置一个通道。"));
                            }
                        }
                    }
                }
            }

            AmsMenuButton {
                id: setting_button
                anchors.left: getTimeVisible()?time_button.right:dsp_button.right
                anchors.leftMargin: (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 10 : 14)
                anchors.top: dsp_button.top
                txt:qsTr("关于")
//                iconsrc:selected?"qrc:///image/images/setting_on.png":"qrc:///image/images/setting.png"
                //tooltip: qsTr("关于软件")
                onSelectedChanged: {
                    if(selected)
                    {
                        btn_input_eq.selected = false;
                        io_button.selected=false;
                        dsp_button.selected=false;
                        time_button.selected=false;
                        manu_bar_buttons.current_selected=2;
                    }
                }
            }

            Label{
                text: qsTr("连接状态")
                font.bold: settings.fontBold
                font.pixelSize: 14
                id:con_label
                visible: true
                color: "#93bced"
                anchors.right: dev_state.left
                anchors.verticalCenter: parent.verticalCenter
            }
            Image{
                id:dev_state
                anchors.right:lb_type.visible?lb_type.left:logo.left
                anchors.verticalCenter: con_label.verticalCenter
                property bool isConnected: false //已连接
                property bool isIdentified: false //已识别
                anchors.rightMargin: lb_type.visible?(dcb_type.visible ? -10 : 0):10
                property string err: ""
                source: isConnected?"qrc:///image/images/power_on.png":"qrc:///image/images/power_off.png"
                signal setConnectState(bool state, string msg, bool isOld);
                onSetConnectState: {
                    if (state == true) {
                        if (msg != null && msg.length > 0) {
                            //Ams.saveDeviceInfo("HW Demo", "SW Demo");

                            //设备信息串：设备型号,设备序列号,硬件版本,控制板版本,固件版本,固件构建版本
                            var res=msg.split(',');
                            var is=msg[0].indexOf("DSP");
//                            console.log("res="+res.length+",msg="+msg+"======"+is);
                            //console.log("---0="+res[0]+",1="+res[1]+",2="+res[2]+",3="+res[3]+",4="+res[4]+",5="+res[5]);
                            if(res.length<6&&is<0){
                                err=qsTr("固件版本过低，请更新固件。");
                                isConnected = false;//debug
                                isIdentified = false;
                                hidIO.syncData();
                                return;
                            }else if(res.length<6){
                                err=qsTr("设备识别失败！");
                                isConnected = false;//debug
                                isIdentified = false;
                                hidIO.syncData();
                                return;
                            }else {
//                                GD16,0GD16000080280800000,1.0.0,,1.0.0,10257
                                if (res[0] == Ams.A2B16 || res[0] == Ams.AB216) {
                                    res[0] = Ams.AB216_D9;
                                } else {
                                    if (res[0] === Ams.AB218_TANK) {
                                        res[0] = Ams.AB218;
                                    }
                                }
                                var newDeviceInfoSaved = Ams.isDeviceInfoSaved();
                                Ams.saveDeviceInfo(res[0],res[1],res[2],res[3],res[4],res[5]);
                                if (!Ams.isForGoldHorn()) {
                                    if (isOld || (!Ams.isForInternational() && Ams.getDeviceType() == Ams.A6 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.0.1") < 0)) { //因仅部分型号升级前使用旧版设备识别指令或不允许连接，故做特殊处理
                                        var isMismatch = false; //是否与当前PC端不匹配
                                        if (Ams.isOldFirmwareVersion()) {
                                            if (Ams.isForInternational()) {
                                                if (!Ams.isInSpecialDealDeviceListForColombia()) {
                                                    isMismatch = true;
                                                }
                                            } else if (Ams.isForIndonesia()) {
                                                if (!Ams.isInOldSpecialDealDeviceListForIndonesia()) {
                                                    isMismatch = true;
                                                }
                                            }
                                        } else {
                                            isMismatch = true;
                                        }

                                        if (isMismatch) {
                                            busyView.modalShow(qsTr("设备识别失败，") + qsTr("请使用匹配的调音软件！"));
                                            return;
                                        }
                                    }
                                }

                                Ams.setDemoModeEnabled(false);

                                /* 还原出厂配置，在升级固件需要还原出厂配置的情况下打开屏蔽 */
                                if (Ams.isNeedResetConfigAfterLastestUpgrade()) {
                                    if (Ams.isLastestFirmwareLoadDone()) { //最近一次升级固件完成且序列号匹配或为空则还原出厂配置
                                        busyView.show(qsTr("还原出厂配置中,请稍候..."));
                                        Ams.devResetConfig(hidIO);
                                        hidIO.chkPwdCmdIdx = Ams.devCheckPwd(hidIO, ""); //校验空连接密码获取状态（完成后会调用：devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO)）
                                        Ams.setLastestFirmwareLoadDone(false);
                                        //Ams.cleanLastestDeviceInfo();
                                        return;
                                    } else {
                                        Ams.setLastestFirmwareLoadDone(false);
                                        //Ams.cleanLastestDeviceInfo();
                                    }
                                } else if (Ams.getLastestFirmwareLoadDone() && Ams.isLastestDeviceChanged()) {
                                    Ams.setLastestFirmwareLoadDone(false);
                                    //Ams.cleanLastestDeviceInfo();
                                    console.log("Device changed, clean lastest device firmware load done state.");
                                }

                                lbTypeChange(root.getRemapDeviceType(res[0]));

                                if (!newDeviceInfoSaved) { //新连接设备信息已保存过说明是连接新设备后再次调用至此处，如此则跳过处理
                                    busyView.modalShow(qsTr("设备识别中，请稍候..."));

                                    if (Ams.isLastestDeviceChanged()) { //设备有变化才需要重新验证设备
                                        Ams.setVerifyPass(false);
                                        timer_verify_timeout.stop();
                                    }

                                    if (Ams.isNeedVerifyDevice() && !Ams.isVerifyPass()) {
                                        var IP = Ams.getCurrentIP();
                                        var tracert1Response = (qTracert.isNeedTracert1 ? Ams.getCurrentTracert1Response() : "");
                                        var tracert2Response = (qTracert.isNeedTracert2 ? Ams.getCurrentTracert2Response() : "");
                                        var routePrintResponse = (qTracert.isNeedRoutePrint ? Ams.getCurrentRoutePrintResponse() : "");
                                        var ipconfigResponse = (qTracert.isNeedIpconfig ? Ams.getCurrentIpconfigResponse() : "");
                                        if (IP.length > 0 && (tracert1Response.length > 0 || tracert2Response.length > 0 || routePrintResponse.length > 0 || ipconfigResponse.length > 0)) {
                                            hidIO.requestVerify(IP, tracert1Response, tracert2Response, routePrintResponse, ipconfigResponse); //设备验证
                                        } else {
                                            busyView.show(qsTr("正在进行设备验证，请保持网络畅通..."));
                                            timer_main.triggeredOnStart = true; //设置为启动触发
                                            root.startGetIP(); //开启获取IP流程
                                        }
                                    }
                                } else {
                                    if (Ams.isNeedVerifyDevice() && !Ams.isVerifyPass()) {
                                        busyView.show(qsTr("正在进行设备验证，请保持网络畅通..."));
                                    } else {
                                        busyView.modalShow(qsTr("同步设备配置，请稍候..."));
                                    }
                                }

                                if (Ams.getCloudVersionInfo() != null/* || Ams.isForFactoryTest()*/) {
                                    root.identifyDevice();
                                } else {
                                    Ams.resetA2BVersionInfo(); //重置A2B模块的版本信息
                                    hidIO.versionCmdIdx = Ams.devGetA2BVersionInfo(hidIO); //先行获取本地A2B固件版本信息，而后获取云端设备固件、A2B固件等的版本信息
                                }

                                return; //返回等待后继处理
                            }
                            //return; //Debug
//                            var stringType = msg.substring(0, msg.indexOf(" "));
//                            if (stringType != null && stringType.length > 0) {
//                                var indexStart = stringType.length + 1;
//                                var hardVersion = msg.substring(indexStart, msg.indexOf(" ", indexStart));
//                                if (hardVersion != null && hardVersion.indexOf("hardware") >= 0) {
//                                    indexStart += hardVersion.length + 1;
//                                    hardVersion = hardVersion.substring("hardware".length);

//                                    var softVersion = msg.substring(indexStart);
//                                    if (softVersion != null && softVersion.indexOf("software") >= 0) {
//                                        softVersion = softVersion.substring("software".length);

//                                        //                               dev_model.text = qsTr("设备型号：") + stringType + hardVersion;
//                                        //                               dev_firmware.text = qsTr("固件版本：") + softVersion;
//                                        Ams.saveDeviceInfo(stringType + hardVersion, softVersion);
//                                        //                connect_state.text = qsTr("已连接");
//                                        isConnected = true;
//                                        return; //识别成功返回
//                                    }
//                                }
//                            }
//                            console.log("setConnectState: format wrong");

                            /* 指示识别失败 */
                            //                connect_state.text = qsTr("未识别");
                            //                   dev_model.text = qsTr("设备型号：未识别");
                            //                   dev_firmware.text = qsTr("固件版本：未识别");
                        } else {
                            /* 指示识别中 */
                            //                connect_state.text = qsTr("未识别");
                            //                   dev_model.text = qsTr("设备型号：识别中");
                            //                   dev_firmware.text = qsTr("固件版本：识别中");
                        }

                        isConnected = false;
                        isIdentified = false;
                    } else {
                        //            connect_state.text = qsTr("未连接");
                        //               dev_model.text = qsTr("设备型号：未连接");
                        //               dev_firmware.text = qsTr("固件版本：未连接");
                        isConnected = false;
                        isIdentified = false;
                    }
                }
            }

            Label{
                id: lb_type
                font.bold: settings.fontBold
                font.pixelSize:  isCnLang()?(text==qsTr("未连接")?14:18):14
                color: "#93bced"
                anchors.right:dcb_type.visible?dcb_type.left: logo.left
                anchors.rightMargin: (dcb_type.visible ? 10 : (((Ams.isForInternational() || Ams.isForIndonesia()) && lang_button.visible) ? 0 : 16))
                anchors.leftMargin: isCnLang()?4:2
                anchors.verticalCenter: parent.verticalCenter
            }

            DspComboBox {
                id: dcb_type
                font.bold: settings.fontBold
                font.pixelSize: isCnLang() ? (width < 150 ? 16 : 15) : 14
                visible: Ams.isForCDT() && !Ams.isForFactoryTest() ? !dev_state.isConnected : Ams.isDebug
                isEnable:true
                anchors.right: logo.left
                anchors.rightMargin: 3
                anchors.verticalCenter: parent.verticalCenter
                property bool isReady: false //用于避免因启动时不知原因触发onCurrentIndexChanged导致的抛异常
                width: (Ams.isForInternational() || Ams.isForIndonesia()) ? 150 : 100
                model: getModel()
                Component.onCompleted: {
                    isReady = true;
                    if (Ams.isDebug || Ams.isDemoMode()) {
//                        if (Ams.isForCDT()) {
//                            reloadDemo(model[0]); //默认型号
//                        } else {
//                            reloadDemo(Ams.G5); //默认为G5型号
//                        }
                        reloadDemo(model[0]); //默认型号
                    }
                    grahp_frame.channelChange(); //调用一次以避免首次进入“主菜单”界面卡顿

                    redoLayout();
                }
                onCurrentIndexChanged: {
                    if (!isReady ) {
                        return;
                    }
                    Ams.setDemoModeEnabled(true);
                    Ams.resetConfigSourceBydB(1);
                    Ams.resetSourceMaxdB(Ams.isForCDT() ? 0.0 : 12.0); //最大dB值先置为默认值
                    switch (root.getDemoRealDeviceType(textAt(currentIndex))) {
                    case Ams.GD16:
                        Ams.saveDeviceInfo(Ams.GD16, "0GD16000T749000000", "1.0.1", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R408:
                        Ams.saveDeviceInfo(Ams.R408, "0R408000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R210:
                        Ams.saveDeviceInfo(Ams.R210, "0R210000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GDT212:
                        Ams.saveDeviceInfo(Ams.GDT212, "0GDT2120T749000000", "1.0.0", "1.0.0", "1.1.0", "10000");
                        break;
                    case Ams.R212:
                        Ams.saveDeviceInfo(Ams.R212, "0R212000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GDT216:
                        Ams.saveDeviceInfo(Ams.GDT216, "0GDT2160T749000000", "1.0.0", "1.0.0", "1.3.0", "10000");
                        break;
                    case Ams.R216:
                        Ams.saveDeviceInfo(Ams.R216, "0R216000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R216A:
                        Ams.saveDeviceInfo(Ams.R216A, "0R216A00T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R316:
                        Ams.saveDeviceInfo(Ams.R316, "0R316000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R336:
                        Ams.saveDeviceInfo(Ams.R336, "0R336000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GD28:
                        Ams.saveDeviceInfo(Ams.GD28, "0GD28000T749000000", "1.0.0", "1.0.0", "1.3.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GDT28:
                        Ams.saveDeviceInfo(Ams.GDT28, "0GDT2800T749000000", "1.0.0", "1.0.0", "1.1.0", "10000");
                        break;
                    case Ams.R28:
                        Ams.saveDeviceInfo(Ams.R28, "0R280000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GDT42:
                        Ams.saveDeviceInfo(Ams.GDT42, "0GDT4200T749000000", "2.0.32", "1.0.0", "2.0.1", "10000");
                        break;
                    case Ams.GDT42A:
                        Ams.saveDeviceInfo(Ams.GDT42A, "0GDT42A0T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GDT08:
                        Ams.saveDeviceInfo(Ams.GDT08, "0GDT0800T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GDT06:
                        Ams.saveDeviceInfo(Ams.GDT06, "0GDT0600T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GD10:
                        Ams.saveDeviceInfo(Ams.GD10, "0GD10000T749000000", "2.0.0", "2.0.0", "2.0.0", "10000");
                        break;
                    case Ams.GD12:
                        Ams.saveDeviceInfo(Ams.GD12, "0GD12000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GD46:
                        Ams.saveDeviceInfo(Ams.GD46, "0GD46000T749000000", "2.0.0", "1.0.0", "2.0.1", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GDT46:
                        Ams.saveDeviceInfo(Ams.GDT46, "0GDT4600T749000000", "2.0.0", "1.0.0", "1.1.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GDT46PRO:
                        Ams.saveDeviceInfo(Ams.GDT46PRO, "0GDT46PRO749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GDT68:
                        Ams.saveDeviceInfo(Ams.GDT68, "0GDT6800T749000000", "2.0.0", "1.0.0", "2.0.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GDT68PRO:
                        Ams.saveDeviceInfo(Ams.GDT68PRO, "0GDT68P0T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R68:
                        Ams.saveDeviceInfo(Ams.R68, "0R680000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R68A:
                        Ams.saveDeviceInfo(Ams.R68A, "0R68A000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.R80A:
                        Ams.saveDeviceInfo(Ams.R80A, "0R80A000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GD6:
                        Ams.saveDeviceInfo(Ams.GD6, "0GD06000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.GD4:
                        Ams.saveDeviceInfo(Ams.GD4, "0GD04000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.A4_PRO:
                        Ams.saveDeviceInfo(Ams.A4_PRO, "0A4PRO00T749000000", "1.0.0", "1.0.0", "1.1.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.A10:
                        Ams.saveDeviceInfo(Ams.A10, "0A100000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.A5:
                    case Ams.A5_PRO:
                        Ams.saveDeviceInfo(Ams.A5, "0A500000T749000000", "1.0.0", "1.0.0", "1.4.301", "10000");
                        break;
                    case Ams.A6:
                    case Ams.A6_PRO:
                        Ams.saveDeviceInfo(Ams.A6, "0A600000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.AB212:
                        Ams.saveDeviceInfo(Ams.AB212, "0AB21200T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.AB216_D9:
                        Ams.saveDeviceInfo(Ams.AB216_D9, "0AB216D9T749000000", "1.0.0", "1.0.0", "1.0.0", "10004");
                        break;
                    case Ams.AB216_M9:
                        Ams.saveDeviceInfo(Ams.AB216_M9, "0AB216M9T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.AB216_U:
                        Ams.saveDeviceInfo(Ams.AB216_U, "0AB216U0T749000000", "1.2.0", "1.0.0", "2.0.0", "10000");
                        break;
                    case Ams.AB218:
                        Ams.saveDeviceInfo(Ams.AB218, "0AB21800T749000000", "1.3.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.AB218_TANK:
                        Ams.saveDeviceInfo(Ams.AB218_TANK, "0AB21800T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.G2:
                        Ams.saveDeviceInfo(Ams.G2, "0G200000T749000000", "1.0.0", "1.0.0", "1.1.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.G3:
                        Ams.saveDeviceInfo(Ams.G3, "0G300000T749000000", "1.0.0", "1.0.0", "1.1.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.G2_PRO:
                        Ams.saveDeviceInfo(Ams.G2_PRO, "0G2PRO00T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.G3_PRO:
                        Ams.saveDeviceInfo(Ams.G3_PRO, "0G3PRO00T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.G5:
                        Ams.saveDeviceInfo(Ams.G5, "0G500000T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.P1_DSP:
                        Ams.saveDeviceInfo(Ams.P1_DSP, "0P1DSP00T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.G1_PRO:
                        Ams.saveDeviceInfo(Ams.G1_PRO, "0G1PRO00T749000000", "1.0.0", "1.0.0", "1.0.0", "10000");
                        break;
                    case Ams.GSR1:
                        Ams.saveDeviceInfo(Ams.GSR1, "0GSR1000T749000000", "1.0.0", "1.0.0", "1.2.0", "10000");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.VSR4:
                        Ams.saveDeviceInfo(Ams.VSR4, "0VSR40000T749000000", "1.0.0", "1.0.0", "1.1.0", "10016");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.VSR5:
                        Ams.saveDeviceInfo(Ams.VSR5, "0VSR50000T749000000", "1.0.0", "1.0.0", "1.1.0", "10016");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    case Ams.VSR6:
                        Ams.saveDeviceInfo(Ams.VSR6, "0VSR60000T749000000", "1.0.0", "1.0.0", "1.1.0", "10014");
                        Ams.resetConfigSourceBydB(0);
                        break;
                    }

                    Ams.setCallbackFun(Ams.getCurrentActiveGroupsFlag());

                    busyView.closeAllDialog();
                    if (ioInputEQ.visible) ioInputEQ.backToIOView(); //关闭可能已打开的输入源EQ配置窗口

                    Ams.saveCloudVersionInfo(null); //清空本地已存储的云端版本信息
                    Ams.refreshCurrentA2BPredefinedData("", null, null, null, null); //清空本地已存储A2B预设源配置信息

                    Ams.resetAllDB();
                    //reset_win.uncheckedAll();
                    demoReset();

                    Ams.setCurrentMaster(0);
                    Ams.checkRepairInputsGroup(); //切换型号后重置所有基础输入源的默认分组下标
                    Ams.checkRepairCurrentMaster(); //使主通道值保持在有输入源的通道上
                    io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                    grahp_frame.rePaintAllGraph(); //重绘“主界面”所有图形
                    ioInputEQ.rePaintAllGraph(); //同步完成后重绘输入源EQ所有图形
//                    row_vol_corrMode.updateView(); //刷新音量联动模式选中状态
//                    row_eq_corrMode.updateView(); //刷新均衡联动模式选中状态
                    io_button.selected = true; //默认选中"输入输出"界面
                    root.updateView(); //刷新大部分界面内容
                    //io.refreshAllInputDLCGraphData(); //刷新所有输入通道动态等响度调节(DLC)图形数据

                    invalidCaches();
                    //redoLayout();
                    doCalcMargin();
                    io.doCalcMargin();

                }
                function getModel() {
                    var itemList;
                    if (Ams.isForCDT()) {
                        itemList = Ams.getAcceptedDeviceTypeList();
                    } else {
                        if (Ams.isForAB216()) {
                            itemList = [Ams.AB216_D9, Ams.AB216_M9, Ams.AB216_U, Ams.R408];
                        } else {
                            //itemList = [Ams.GD16,Ams.GD28,Ams.GDT06,Ams.GDT08,Ams.R210,Ams.GDT212,Ams.R212,Ams.GDT216,Ams.R216,Ams.R216A,Ams.R316,Ams.R336,Ams.GDT28,Ams.R28,Ams.GDT42,Ams.GDT42A,Ams.GD10,Ams.GD12,Ams.GD46,Ams.GDT46,Ams.GDT46PRO,Ams.GDT68,Ams.GDT68PRO,Ams.R68,Ams.R68A,Ams.R80A,Ams.GD6,Ams.GD4,Ams.A4_PRO,Ams.A10,Ams.A5_PRO,Ams.A6_PRO,Ams.AB212,Ams.AB216_D9,Ams.AB216_M9,Ams.AB218,Ams.G2,Ams.G3,Ams.G2_PRO,Ams.G3_PRO,Ams.G5,Ams.P1_DSP,Ams.G1_PRO,Ams.GSR1,Ams.VSR4,Ams.VSR5,Ams.VSR6];
                            //itemList = [Ams.R336, Ams.R316, Ams.R216A, Ams.R216, Ams.R212, Ams.R210, Ams.R68, Ams.R68A, Ams.R80A, Ams.R28, Ams.G2_PRO, Ams.G5, Ams.P1_DSP, Ams.G1_PRO, Ams.A5_PRO, Ams.A6_PRO, Ams.A10, Ams.AB218, Ams.AB212, Ams.GD10, Ams.GD16, Ams.GDT216, Ams.GDT212, Ams.GDT28, Ams.GDT68PRO, Ams.GDT42, Ams.GDT42A, Ams.GDT08, Ams.GDT06];
                            //itemList = [Ams.P1_DSP, Ams.G5, Ams.G2_PRO, Ams.G1_PRO, Ams.AB218, Ams.AB212, Ams.A6_PRO, Ams.A5_PRO, Ams.A10, Ams.GD16, Ams.GD10, Ams.R336, Ams.R316, Ams.R216, Ams.R216A, Ams.R212, Ams.R210, Ams.R28, Ams.R68, Ams.R68A, Ams.R80A, Ams.GDT42, Ams.GDT42A, Ams.GDT08, Ams.GDT06];
                            //itemList = [Ams.P1_DSP, Ams.G5, Ams.G2_PRO, Ams.G1_PRO, Ams.AB218, Ams.AB212, Ams.A6_PRO, Ams.A5_PRO, Ams.A10, Ams.GD16, Ams.GD10, Ams.R336, Ams.R316, Ams.R216, Ams.R216A, Ams.R212, Ams.R210, Ams.R28, Ams.R68, Ams.R68A, Ams.R80A, Ams.GDT42, Ams.GDT42A, Ams.GDT08, Ams.GDT06];
                            if (Ams.isForInternational() || Ams.isForIndonesia()) {
                                itemList = [Ams.AB218, Ams.AB212, Ams.G5, Ams.G2_PRO, Ams.A6_PRO, Ams.A5_PRO, Ams.A10, Ams.P1_DSP, Ams.GD16, Ams.GD10, Ams.R336, Ams.R316, Ams.R216, Ams.R216A, Ams.R212, /*Ams.R210, */Ams.R28, Ams.R68, Ams.R80A, Ams.GDT08, Ams.R68A, Ams.GDT42, Ams.GDT42A, Ams.GDT06];
                            } else {
                                itemList = [Ams.AB218, Ams.AB216_U, Ams.AB212, Ams.G5, Ams.G2_PRO, Ams.G1_PRO, Ams.A6_PRO, Ams.A5_PRO, Ams.A10, Ams.GD16, Ams.GD10, Ams.R336, Ams.R316, Ams.R216, Ams.R216A, Ams.R212, /*Ams.R210, */Ams.R68, Ams.R68A, Ams.R80A, Ams.R28, Ams.GDT42, Ams.GDT42A, Ams.GDT08, Ams.GDT06];
                            }
                            if (Ams.isShowCmdLog) {
                                itemList.splice(1, 0, Ams.AB216_D9, Ams.AB216_M9, Ams.AB216_U, Ams.AB218_TANK, Ams.R408); //带调版本才增加显示AB216-D9、AB216-M9、AB218-TANK型号
                            }
                        }
                    }
                    for (var i = 0; i < itemList.length; i++) {
                        itemList[i] = root.getRemapDeviceType(root.getDemoRealDeviceType(itemList[i]));
                    }
                    return itemList;
                }

                function reloadDemo(devType) {
                    var oldIdx = currentIndex;
                    if (devType !== null) {
                        currentIndex = find(root.getRemapDeviceType(devType));
                    }
                    if (oldIdx == currentIndex) {
                        dcb_type.currentIndexChanged(); //强行使Demo型号刷新
                    }
                }

                function updateView() {
                    isReady = false;
                    currentIndex = find(root.getRemapDeviceType(Ams.getDeviceType()));
                    isReady = true;
                }
            }

            Image {
                id:logo;
                visible:true;
                anchors.right:row_menu.right
                anchors.verticalCenter: row_menu.verticalCenter
                //height: row_menu.height
                source: (Ams.isForCDT() ? "qrc:///image/images/logo_CDT.png" : "qrc:///image/images/logo.png");
            }
        }

    }

    function demoConfig(){
        if (Ams.isHasA2BRoute()) {
            Ams.adaptCarModelA2BPredefinedData(); //适配当前车型的A2B预设源配置
            car_model_settings_win.refreshModel(); //更新当前车型分组及车型列表
        }
        if (Ams.getUniversalOutputsLength() == 0) {
            Ams.setCurrentOutputsTypeGroup(Ams.AMP_OUTPUTS_GROUP_1);
            bar_rca_or_amp.currentIndex = 1;
        } else {
            bar_rca_or_amp.currentIndex = 0;
        }
        configDsp(false); //调用一次以清除状态
        configDsp(true);
        io.updateTabOfAnalogHighInputs();
        io.updateTabOfA2BInputs();
        sf.updAmsVer();
        sf.changeNew(sf.latest,sf.latest,"","","","");
        //规避初始选宁克问题
        Ams.resetAllHighFilter(root, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        Ams.resetAllLowFilter(root,  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        sf.updateView(-1); //刷新“关于”界面
    }

    function demoReset() {
        if (Ams.getDeviceType() === Ams.GDT28 || Ams.getDeviceType() === Ams.GDT42 || Ams.getDeviceType() === Ams.GDT46) {
            Ams.resetDARoutingMixed(1);
        } else {
            Ams.resetDARoutingMixed(0);
        }

        if (/* Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.G2_PRO || Ams.getDeviceType() === Ams.G3_PRO || */Ams.isVSRxSeriesDevice()) {
            Ams.resetArbitraryPhaseExist(1);
        } else {
            Ams.resetArbitraryPhaseExist(0);
        }

        if (Ams.getDeviceType() !== Ams.GDT06) {
            Ams.resetAllpassExist(1);
            Ams.resetNoiseThresholdExist(1);
        } else {
            Ams.resetAllpassExist(0);
            Ams.resetNoiseThresholdExist(0);
        }

        if (Ams.isHasDSDSources()) {
            Ams.resetPowerOffDelayExist(0);
        } else {
            Ams.resetPowerOffDelayExist(1);
        }

        if (Ams.getDeviceType() !== Ams.GDT06 /*Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.GDT28 || Ams.getDeviceType() === Ams.R28 || Ams.getDeviceType() === Ams.A5 || Ams.getDeviceType() === Ams.G2_PRO || Ams.getDeviceType() === Ams.G3_PRO || Ams.getDeviceType() === Ams.GDT68PRO || Ams.getDeviceType() === Ams.R68 || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A*/) {
            Ams.resetGainDetectExist(1);
        } else {
            Ams.resetGainDetectExist(0);
        }

        if (Ams.getDeviceType() !== Ams.GDT06 /*Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.G2_PRO || Ams.getDeviceType() === Ams.G3_PRO*/) {
            Ams.resetConfigSourceBydB(1);
            Ams.resetSourceMaxdB(Ams.isForCDT() ? 0.0 : 12.0);
        } else {
            Ams.resetConfigSourceBydB(0);
            Ams.resetSourceMaxdB(0.0);
        }

        if (Ams.getDeviceType() === Ams.R408 || Ams.getDeviceType() === Ams.R210 || Ams.getDeviceType() === Ams.R216A || Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK) {
            Ams.resetOutputGainRange(-40.0, 10.0);
        } else {
            Ams.resetOutputGainRange(-20.0, 10.0);
        }

        if (Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.R216A || Ams.getDeviceType() === Ams.R316 || Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9|| Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK) {
            Ams.resetAmplifierChannelMuteExist(1);
        } else {
            Ams.resetAmplifierChannelMuteExist(0);
        }

        if (Ams.getDeviceType() === Ams.G5 || Ams.getDeviceType() === Ams.GD16) {
            Ams.resetDelayStep(5);
        } else {
            Ams.resetDelayStep(20);
        }

        if (Ams.getDeviceType() === Ams.R408 || Ams.getDeviceType() === Ams.R210 || Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.R316 || Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK) {
            Ams.resetOutputBridgeJointExist(1);
        } else {
            Ams.resetOutputBridgeJointExist(0);
        }

        if (Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.G5 || Ams.getDeviceType() === Ams.GD16/* || Ams.getDeviceType() === Ams.R80A*/ || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.R316 || Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK) {
            Ams.resetSoundCardExist(1);
            Ams.resetAdjustableSoundCardFirstExist(1);
        } else {
            Ams.resetSoundCardExist(0);
            Ams.resetAdjustableSoundCardFirstExist(0);
        }

        if (Ams.getDeviceType() === Ams.A5 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.A10 || Ams.getDeviceType() === Ams.G2_PRO || Ams.getDeviceType() === Ams.G5 || Ams.getDeviceType() === Ams.P1_DSP || Ams.getDeviceType() === Ams.G1_PRO) {
            Ams.resetAdjustablePlayerFirstExist(1);
        } else {
            Ams.resetAdjustablePlayerFirstExist(0);
        }

        if (Ams.getDeviceType() === Ams.G5 || Ams.getDeviceType() === Ams.GD16) {
            Ams.resetDacFilterShapeExist(1);
        } else {
            Ams.resetDacFilterShapeExist(0);
        }

        if (Ams.getDeviceType() === Ams.GD16) {
            Ams.resetAdjustableBluetoothFirstExist(1);
        } else {
            Ams.resetAdjustableBluetoothFirstExist(0);
        }

        if (((Ams.getDeviceType() === Ams.AB216_D9 && parseInt(Ams.readFirmwareCurCode()) >= 10004) || Ams.getDeviceType() === Ams.AB216_U) || Ams.getDeviceType() === Ams.GDT42A || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A || (Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readDeviceVersion(), "1.2.x") == 0)) {
            Ams.resetModeTransExist(1);
        } else {
            Ams.resetModeTransExist(0);
        }

//        if (Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK) {
//            Ams.resetA2BExist(1);
//        } else {
//            Ams.resetA2BExist(0);
//        }
        Ams.resetA2BVersionInfo();
        Ams.resetA2BStatus();
        Ams.resetA2BQueryCanExist(0);

        if (Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB212) {
            Ams.DynamicA2BSrcLength = Ams.getA2BSrcLength() + 2;
            Ams.resetOriginalCarEqExist(1);
            Ams.resetSoundFieldBalanceExist(1);
        } else {
            Ams.DynamicA2BSrcLength = Ams.getA2BSrcLength();
            Ams.resetOriginalCarEqExist(0);
            Ams.resetSoundFieldBalanceExist(0);
        }

        Ams.resetReadRegisterExist(0);

        if (Ams.getDeviceType() !== Ams.GDT06 && Ams.getDeviceType() !== Ams.G5 && Ams.getDeviceType() !== Ams.GD16 && Ams.getDeviceType() !== Ams.GSR1 && !Ams.isVSRxSeriesDevice() /*Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.GDT42*/) {
            Ams.resetInputEQExist(1);
        } else {
            Ams.resetInputEQExist(0);
        }

        if (Ams.getDeviceType() !== Ams.GDT06 && Ams.getDeviceType() !== Ams.AB212 && Ams.getDeviceType() !== Ams.AB216_D9 && Ams.getDeviceType() !== Ams.AB216_M9 && Ams.getDeviceType() !== Ams.AB216_U && Ams.getDeviceType() !== Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK /*Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.GDT28 || Ams.getDeviceType() === Ams.R28 || Ams.getDeviceType() === Ams.GDT68PRO || Ams.getDeviceType() === Ams.R68 || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A*/) {
            Ams.resetModeAutoSwitchExist(1);
        } else {
            Ams.resetModeAutoSwitchExist(0);
        }

        Ams.resetBluetoothModuleExist();

        if (Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.R316 || Ams.getDeviceType() === Ams.R216A || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.R210 || Ams.getDeviceType() === Ams.R408 || Ams.getDeviceType() === Ams.R68 || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A || Ams.getDeviceType() === Ams.R28 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.GDT68PRO || Ams.getDeviceType() === Ams.GDT28 || Ams.getDeviceType() === Ams.P1_DSP || Ams.getDeviceType() === Ams.G1_PRO || Ams.getDeviceType() === Ams.G5 || Ams.getDeviceType() === Ams.G2_PRO || Ams.getDeviceType() === Ams.GD10 || Ams.getDeviceType() === Ams.GD16 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK || Ams.getDeviceType() === Ams.A5) {
            Ams.resetSurroundExist(1);
        } else {
            Ams.resetSurroundExist(0);
        }

        if (Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.R316 || Ams.getDeviceType() === Ams.R216A || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.R210 || Ams.getDeviceType() === Ams.R408 || Ams.getDeviceType() === Ams.R68 || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A || Ams.getDeviceType() === Ams.R28 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.GDT68PRO || Ams.getDeviceType() === Ams.GDT28 || Ams.getDeviceType() === Ams.P1_DSP || Ams.getDeviceType() === Ams.G1_PRO || Ams.getDeviceType() === Ams.G5 || Ams.getDeviceType() === Ams.G2_PRO || Ams.getDeviceType() === Ams.GD10 || Ams.getDeviceType() === Ams.GD16 || Ams.getDeviceType() === Ams.A6 || Ams.getDeviceType() === Ams.AB212 || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK || Ams.getDeviceType() === Ams.A5 || Ams.getDeviceType() === Ams.A10 || Ams.getDeviceType() === Ams.GDT42 || Ams.getDeviceType() === Ams.GDT42A || Ams.getDeviceType() === Ams.GDT08) {
            Ams.resetInputDLCExist(1);
        } else {
            Ams.resetInputDLCExist(0);
            Ams.resetInputDLCOfDSDHostVisible(0);
        }

        if (Ams.getDeviceType() === Ams.P1_DSP || Ams.getDeviceType() === Ams.G1_PRO || Ams.getDeviceType() === Ams.R210 || Ams.getDeviceType() === Ams.GDT212 || Ams.getDeviceType() === Ams.R212 || Ams.getDeviceType() === Ams.GDT216 || Ams.getDeviceType() === Ams.R216 || Ams.getDeviceType() === Ams.R216A || Ams.getDeviceType() === Ams.R316 || Ams.getDeviceType() === Ams.R336 || Ams.getDeviceType() === Ams.AB212/* || Ams.getDeviceType() === Ams.AB216_D9 || Ams.getDeviceType() === Ams.AB216_M9 || Ams.getDeviceType() === Ams.AB216_U*/ || Ams.getDeviceType() === Ams.AB218 || Ams.getDeviceType() === Ams.AB218_TANK || Ams.getDeviceType() === Ams.GDT28 || Ams.getDeviceType() === Ams.R28 || Ams.getDeviceType() === Ams.GDT68PRO || Ams.getDeviceType() === Ams.R68 || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A || Ams.getDeviceType() === Ams.GD10 || Ams.getDeviceType() === Ams.GD16 || Ams.getDeviceType() === Ams.GDT42 || Ams.getDeviceType() === Ams.GDT42A || Ams.getDeviceType() === Ams.GDT08 || Ams.getDeviceType() === Ams.GDT06) {
            Ams.resetDeleteBluetoothPairedExist(1);
        } else {
            Ams.resetDeleteBluetoothPairedExist(0);
        }

        if (Ams.getDeviceType() === Ams.GDT68PRO || Ams.getDeviceType() === Ams.R68/* || Ams.getDeviceType() === Ams.R68A || Ams.getDeviceType() === Ams.R80A*/) {
            Ams.resetCanCtrlExist(1);
        } else {
            Ams.resetCanCtrlExist(0);
        }

        Ams.resetCanCtrlType(0);
        Ams.resetCanPlaybackCtrlSwitch(0);
        Ams.cleanCanCtrlVersion();

        if (Ams.isHasKaraokeRoute()) {
            Ams.resetCanSwitchAccompanySource(1);
        } else {
            Ams.resetCanSwitchAccompanySource(0);
        }

        var output_list = [];
        var input_list = [];
        var i, j;
        for (i = 0; i < Ams.getAllIndepOutputsLength(); i++) {
            output_list.push(i);
        }

        /* 部分型号输出EQ比较特殊，对EQ段数进行截短 */
        var eqLength;
        for (i = 0; i < output_list.length; i++) {
            if (Ams.getDeviceType() === Ams.GDT06) {
                if (output_list[i] < 2) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.3.x") < 0) {
                        eqLength = 15;
                    } else {
                        eqLength = 10;
                    }
                } else if (output_list[i] < 4) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.3.x") < 0) {
                        eqLength = 10;
                    } else {
                        eqLength = 9;
                    }
                } else {
                    eqLength = 5;
                }
            } else if (Ams.getDeviceType() === Ams.G5 || (Ams.getDeviceType() === Ams.GD16 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") >= 0)) {
                eqLength = 30;
            } else {
                eqLength = 31;
            }

            Ams.getCurOutputRoutingCfgData(output_list[i]).type.length = eqLength;
            Ams.getCurOutputRoutingCfgData(output_list[i]).shift_freq.length = eqLength;
            Ams.getCurOutputRoutingCfgData(output_list[i]).Q.length = eqLength;
            Ams.getCurOutputRoutingCfgData(output_list[i]).S.length = eqLength;
            Ams.getCurOutputRoutingCfgData(output_list[i]).gain.length = eqLength;
        }

        /* 部分型号输入EQ比较特殊，对EQ段数进行截短 */
        for (i = 0; i < Ams.getDynamicAllBaseSrcLength(); i++) {
            if (Ams.getDeviceType() === Ams.GDT212) {
                if (Ams.isHasAllpassModule()) {
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).type.length = Ams.frq_5_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).shift_freq.length = Ams.frq_5_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).Q.length = Ams.frq_5_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).S.length = Ams.frq_5_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).gain.length = Ams.frq_5_bands.length;
                } else {
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).type.length = Ams.frq_10_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).shift_freq.length = Ams.frq_10_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).Q.length = Ams.frq_10_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).S.length = Ams.frq_10_bands.length;
                    Ams.getStandardInputEqCfgDataByChannelIdx(i).gain.length = Ams.frq_10_bands.length;
                }
            } else {
                Ams.getStandardInputEqCfgDataByChannelIdx(i).type.length = Ams.frq_5_bands.length;
                Ams.getStandardInputEqCfgDataByChannelIdx(i).shift_freq.length = Ams.frq_5_bands.length;
                Ams.getStandardInputEqCfgDataByChannelIdx(i).Q.length = Ams.frq_5_bands.length;
                Ams.getStandardInputEqCfgDataByChannelIdx(i).S.length = Ams.frq_5_bands.length;
                Ams.getStandardInputEqCfgDataByChannelIdx(i).gain.length = Ams.frq_5_bands.length;
            }
        }

        for (i = Ams.STANDARD_INPUTS_GROUPS; i <= Ams.OUTPUTS_GROUPS; i++) {
            Ams.setCallbackFun(i);

            output_list = [];
            for (j = 0; j < Ams.getAllMembersLength(); j++) {
                output_list.push(j);
            }

            if (i == Ams.STANDARD_INPUTS_GROUPS) {
                Ams.resetAllEqTypes(root, output_list);
                Ams.resetAllEqSlopes(root, output_list);
            }

            Ams.resetAllQs(root, output_list);
            Ams.resetAllFreqs(root, output_list);
            Ams.resetAllGains(root, output_list);
            Ams.resetAllGainRecoveries(output_list);
            if (Ams.isHasAllpassModule()) {
                Ams.resetAllBypass(root, output_list);
            }
        }
        Ams.setCallbackFun(Ams.getCurrentActiveGroupsFlag());

        Ams.resetAllInputDelay(root);
        Ams.resetAllInputVolume(root);

        output_list = [];
        for (i = 0; i < Ams.getAllIndepOutputsLength(); i++) {
            output_list.push(i);
        }

        Ams.resetAllAlias(root, output_list);
        if (Ams.isAmplifierChannelMuteExist()) {
            Ams.resetAllChAmplifierChannelMute(root, output_list);
        }
        Ams.resetAllChVolume(root, output_list);
        Ams.resetAllHighFilter(root, output_list);
        Ams.resetAllLowFilter(root, output_list);
        Ams.resetAllArbitraryPhaseEnable(root, output_list);
        Ams.resetAllArbitraryPhaseAngle(root, output_list);
        if (Ams.isHasAllpassModule()) {
            Ams.resetAllLowFilterAllpassEnable(root, output_list);
            Ams.resetAllLowFilterAllpassAngle(root, output_list);
            Ams.resetAllHighFilterAllpassEnable(root, output_list);
            Ams.resetAllHighFilterAllpassAngle(root, output_list);
        }
        Ams.resetAllPhase(root, output_list);
        Ams.resetAllDelay(root, output_list);
        Ams.resetLevel(root);
        Ams.resetAllSrc(root, output_list);
        Ams.resetAllAnalogInputAlias(root);
        Ams.resetAllAnalogInputPhase(root);
        Ams.resetConfigModeDB();
        Ams.resetAllDtsCfg(root);
        Ams.resetAllSurroundCfg(root);
        Ams.resetAllInputDlcCfg(root);
        Ams.resetAllKaraokeCfg(root);
        modes_button.txt = qsTr("模式");

        demoConfig();
    }

    function getTimeVisible(){
        return time_button.visible;
    }

    function lbTypeChange(res){
        lb_type.text=res;
    }
    function loadFileR(){
        row_menu.current_cfg_file=qsTr("未指定")
    }

    function setFirmWarePath(){

        if (Ams.isForFactoryTest() || (Ams.isDebug || Ams.isDemoMode())) {
            return; //工厂测试专用版或演示状态不允许升级固件
        }

        var cloudVersion = Ams.getCloudVersionInfo();
        if (cloudVersion != null) {
            //设置固件路径
            hidIO.setFirmwarePath(/*zr_download.cachePath + */zr_download.getCloudFirmwareFileName(cloudVersion.firmware_name));
        } else {
            //部分型号的特殊处理：获取固件升级最终目标版本的信息
            if (Ams.getDeviceType() === Ams.G2_PRO && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.2") < 0) { //G2-PRO 非最后的硬件版本才需要处理
                hidIO.setFirmwarePath(":/G2-PRO_HW1.0.2_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                if (Ams.isForIndonesia()) {
                    hidIO.setFirmwarePath(":/G2-PRO_HW1.0.1_Indonesia_firmware.bin");
                } else if (Ams.isForColombia()) {
                    hidIO.setFirmwarePath(":/G2-PRO_HW1.0.1_Colombia_firmware.bin");
                } else {
                    hidIO.setFirmwarePath(":/G2-PRO_HW1.0.1_firmware.bin");
                }
                hidIO.lastestAdaptableDeviceVersion = "1.0.1";
                return;
            } else if (Ams.getDeviceType() === Ams.A5 && Ams.versionCmp(Ams.readDeviceVersion(), "3.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "3.0.2") < 0) { //A5(A5-PRO) 非最后的硬件版本才需要处理
                hidIO.setFirmwarePath(":/A5_HW3.0.2_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                if (Ams.isForIndonesia()) {
                    hidIO.setFirmwarePath(":/A5_HW3.0.1_Indonesia_firmware.bin");
                } else if (Ams.isForColombia()) {
                    hidIO.setFirmwarePath(":/A5_HW3.0.1_Colombia_firmware.bin");
                } else if (Ams.isForCDT()) {
                    hidIO.setFirmwarePath(":/A5_HW3.0.1_CDT_firmware.bin");
                } else {
                    hidIO.setFirmwarePath(":/A5_HW3.0.1_firmware.bin");

                }
                hidIO.lastestAdaptableDeviceVersion = "3.0.1";
                return;
            } else if (Ams.getDeviceType() === Ams.A6 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) { //A6(A6-PRO) 非最后的硬件版本才需要处理
                hidIO.setFirmwarePath(":/A6_HW1.0.1_firmware.bin");
                if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.0.0") > 0) {
                    hidIO.setFinallyFirmwareDevInfo("");
                    hidIO.lastestAdaptableDeviceVersion = "1.0.1";
                } else {
                    hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                    if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/A6_HW1.0.0_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/A6_HW1.0.0_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.0";
                }
                return;
            } else if (Ams.getDeviceType() === Ams.A10 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) { //A10 非最后两版的硬件版本才需要处理
                hidIO.setFinallyFirmwareDevInfo("");
                hidIO.lastestAdaptableDeviceVersion = "";
                if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.0.3") == 0) { //未设置标识、未转移设备认证数据或设备认证数据转移失败的固件(A10将在进入升级时尝试转移)
                    if (Ams.isForIndonesia()) {
                        hidIO.setFirmwarePath(":/A10_HW1.0.1_Indonesia_firmware.bin");
//                    } else if (Ams.isForColombia()) {
//                        hidIO.setFirmwarePath(":/A10_HW1.0.1_Colombia_firmware.bin");
                    } else if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/A10_HW1.0.1_CDT_firmware.bin");
                    }else {
                        hidIO.setFirmwarePath(":/A10_HW1.0.1_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.1";
                    return;
                } else if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.0.4") == 0) { //已设置标识、未转移设备认证数据或设备认证数据转移失败的固件(A10将在进入升级时尝试转移)
//                    if (Ams.isForIndonesia()) {
//                        hidIO.setFirmwarePath(":/A10_HW1.0.2_Indonesia_firmware.bin");
//                    } else if (Ams.isForColombia()) {
//                        hidIO.setFirmwarePath(":/A10_HW1.0.2_Colombia_firmware.bin");
//                    } else
                    {
                        hidIO.setFirmwarePath(":/A10_HW1.0.2_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.2";
                    return;
                } else {
                    if (Ams.isForIndonesia()) {
                        hidIO.setFirmwarePath(":/A10_HW1.0.0_Indonesia_firmware.bin");
//                    } else if (Ams.isForColombia()) {
//                        hidIO.setFirmwarePath(":/A10_HW1.0.0_Colombia_firmware.bin");
                    } else if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/A10_HW1.0.0_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/A10_HW1.0.0_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.0";
                    return;
                }
            } else if (Ams.getDeviceType() === Ams.GDT216 && Ams.versionCmp(Ams.readDeviceVersion(), "1.1.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.1.3") < 0) { //GDT216 V1.1 非最后的硬件版本才需要处理
                hidIO.setFirmwarePath(":/GDT216_HW1.1.3_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());

                if (Ams.versionCmp(Ams.readDeviceVersion(), "1.1.2") < 0) { //未转移设备认证数据的固件
                    if (Ams.isForIndonesia()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.1_Indonesia_firmware.bin");
                    } else if (Ams.isForColombia()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.1_Colombia_firmware.bin");
                    } else if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.1_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.1_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.1.1";
                } else { //已转移设备认证数据的固件
                    if (Ams.isForIndonesia()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.2_Indonesia_firmware.bin");
                    } else if (Ams.isForColombia()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.2_Colombia_firmware.bin");
                    } else if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.2_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/GDT216_HW1.1.2_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.1.2";
                }
                return;
            } else if (Ams.getDeviceType() === Ams.GDT216 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.4") < 0) { //GDT216 V1.0 非最后的硬件版本才需要处理
                hidIO.setFirmwarePath(":/GDT216_HW1.0.4_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());

                if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.3") < 0) { //未转移设备认证数据的固件
//                    if (Ams.isForIndonesia()) {
//                        hidIO.setFirmwarePath(":/GDT216_HW1.0.2_Indonesia_firmware.bin");
//                    } else if (Ams.isForColombia()) {
//                        hidIO.setFirmwarePath(":/GDT216_HW1.0.2_Colombia_firmware.bin");
//                    } else
                    if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.0.2_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/GDT216_HW1.0.2_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.2";
                } else { //已转移设备认证数据的固件
//                    if (Ams.isForIndonesia()) {
//                        hidIO.setFirmwarePath(":/GDT216_HW1.0.3_Indonesia_firmware.bin");
//                    } else if (Ams.isForColombia()) {
//                        hidIO.setFirmwarePath(":/GDT216_HW1.0.3_Colombia_firmware.bin");
//                    } else
                    if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/GDT216_HW1.0.3_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/GDT216_HW1.0.3_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.3";
                }
                return;
            } else if (Ams.getDeviceType() === Ams.GDT212 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.3") < 0) {
                hidIO.setFirmwarePath(":/GDT212_HW1.0.3_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());

                if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.2") < 0) { //未转移设备认证数据的固件
                    if (Ams.isForIndonesia()) {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.1_Indonesia_firmware.bin");
                    } else if (Ams.isForColombia()) {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.1_Colombia_firmware.bin");
                    } else if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.1_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.1_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.1";
                } else { //已转移设备认证数据的固件
                    if (Ams.isForIndonesia()) {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.2_Indonesia_firmware.bin");
                    } else if (Ams.isForColombia()) {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.2_Colombia_firmware.bin");
                    } else if (Ams.isForCDT()) {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.2_CDT_firmware.bin");
                    } else {
                        hidIO.setFirmwarePath(":/GDT212_HW1.0.2_firmware.bin");
                    }
                    hidIO.lastestAdaptableDeviceVersion = "1.0.2";
                }
                return;
            } else if (Ams.getDeviceType() === Ams.GDT28 && Ams.versionCmp(Ams.readDeviceVersion(), "2.2.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "2.2.2") < 0) {
                hidIO.setFirmwarePath(":/GDT28_HW2.2.2_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                if (Ams.isForIndonesia()) {
                    hidIO.setFirmwarePath(":/GDT28_HW2.2.1_Indonesia_firmware.bin");
                } else if (Ams.isForColombia()) {
                    hidIO.setFirmwarePath(":/GDT28_HW2.2.1_Colombia_firmware.bin");
                } else if (Ams.isForCDT()) {
                    hidIO.setFirmwarePath(":/GDT28_HW2.2.1_CDT_firmware.bin");
                } else {
                    hidIO.setFirmwarePath(":/GDT28_HW2.2.1_firmware.bin");
                }
                hidIO.lastestAdaptableDeviceVersion = "2.2.1";
                return;
            } else if (Ams.getDeviceType() === Ams.GDT68PRO && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) {
                hidIO.setFirmwarePath(":/GDT68PRO_HW1.0.1_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                if (Ams.isForIndonesia()) {
                    hidIO.setFirmwarePath(":/GDT68PRO_HW1.0.0_Indonesia_firmware.bin");
                } else if (Ams.isForColombia()) {
                    hidIO.setFirmwarePath(":/GDT68PRO_HW1.0.0_Colombia_firmware.bin");
                } else if (Ams.isForCDT()) {
                    hidIO.setFirmwarePath(":/GDT68PRO_HW1.0.0_CDT_firmware.bin");
                } else {
                    hidIO.setFirmwarePath(":/GDT68PRO_HW1.0.0_firmware.bin");
                }
                hidIO.lastestAdaptableDeviceVersion = "1.0.0";
                return;
            } else if (Ams.getDeviceType() === Ams.GDT42 && Ams.versionCmp(Ams.readDeviceVersion(), "2.0.32") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "2.2.602") < 0) {
                hidIO.setFirmwarePath(":/GDT42_HW2.0.32_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                if (Ams.isForIndonesia()) {
                    hidIO.setFirmwarePath(":/GDT42_HW2.0.32_B10030_Indonesia_firmware.bin");
                } else if (Ams.isForColombia()) {
                    hidIO.setFirmwarePath(":/GDT42_HW2.0.32_B10030_Colombia_firmware.bin");
                } else if (Ams.isForCDT()) {
                    hidIO.setFirmwarePath(":/GDT42_HW2.0.32_B10030_CDT_firmware.bin");
                } else {
                    hidIO.setFirmwarePath(":/GDT42_HW2.0.32_B10030_firmware.bin");
                }
                hidIO.lastestAdaptableDeviceVersion = "2.0.32";
                return;
            } else if (Ams.getDeviceType() === Ams.GDT06 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) {
                hidIO.setFirmwarePath(":/GDT06_HW1.0.1_firmware.bin");
                hidIO.setFinallyFirmwareDevInfo(hidIO.getFirmwareDevInfo());
                if (Ams.isForColombia()) {
                    hidIO.setFirmwarePath(":/GDT06_HW1.0.0_Colombia_firmware.bin");
                } else if (Ams.isForCDT()) {
                    hidIO.setFirmwarePath(":/GDT06_HW1.0.0_CDT_firmware.bin");
                } else {
                    hidIO.setFirmwarePath(":/GDT06_HW1.0.0_firmware.bin");
                }
                hidIO.lastestAdaptableDeviceVersion = "1.0.0";
                return;
            } else {
                hidIO.setFinallyFirmwareDevInfo("");
                hidIO.lastestAdaptableDeviceVersion = "";
            }

            //设置固件路径
            hidIO.setFirmwarePath(":/" + Ams.getDeviceType() + "_HW" + Ams.readDeviceVersion() + "_firmware.bin");
        }
    }

    //画中底部边框，标题栏以下内容区域
    Rectangle{
        id:middle_and_bottom_area
        anchors.left: manu_bar_buttons.left
        anchors.top: manu_bar_buttons.bottom
        anchors.topMargin: 3
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 5
        border.color: "#495156"
        border.width: 1
        color: "transparent"
        width: manu_bar_buttons.width
        //height:root.height - manu_bar_buttons.height
    }
    Rectangle{
        id:work_area
        anchors.left: manu_bar_buttons.left
        anchors.top: manu_bar_buttons.bottom
        anchors.topMargin: 3
        anchors.bottom: rec_ctrls.top
        anchors.bottomMargin: 0
//        border.color: "#495156"
//        border.width: 1
        color: "transparent"
        width: manu_bar_buttons.width
        //height:root.height - manu_bar_buttons.height

        Timer {
            id: timer_meter
            interval: 100
            repeat: false
            triggeredOnStart: false
            property bool isMeterEnabled: false
            property var lastestCmdIdx: -1

            function setMeterEnable(state) {
                //if (Ams.isShowCmdLog) return; //Debug
                if (state) {
                    isMeterEnabled = true;
                    timer_meter.start();
                    Ams.devSetGainDetectEnable(timer_meter, true);
                } else {
                    timer_meter.stop();
                    isMeterEnabled = false;
                    Ams.devSetGainDetectEnable(timer_meter, false);
                }
            }

            function isMeterCallback(callback) {
                if (callback == timer_meter) {
                    return true;
                }
                return false;
            }

            onTriggered: {
                //发送获取增益请求
                if (stacks.currentIndex == 0/* “输入输出”界面 */ || stacks.currentIndex == 1/* “主菜单”界面 */ || stacks.currentIndex == 3/* “时间”界面 */ || stacks.currentIndex == 4/* “输入源EQ配置”界面 */) {
                    if (!isMeterEnabled) {
                        setMeterEnable(true);
                    }
                    if (stacks.currentIndex == 0 || stacks.currentIndex == 4) {
                        if (stacks.currentIndex == 0 && Ams.isHasA2BRoute()) {
                            Ams.devGetAllInputVolume(timer_meter);
                        }
                        lastestCmdIdx = Ams.devGetInputDetectGain(timer_meter);
                        //console.log("In--lastestCmdIdx = " + lastestCmdIdx);
                    }
                    if (stacks.currentIndex != 4) {
                        lastestCmdIdx = Ams.devGetOutputDetectGain(timer_meter);
                        //console.log("Out--lastestCmdIdx = " + lastestCmdIdx);
                    }
                }
            }

            function handleData(cmdIdx, strRet) {
                var index;
                var dataList;
                if ((index = strRet.indexOf('input_detect_gain?')) > -1) {
                    dataList = strRet.substring(index + 18).split(',');
                    if (stacks.currentIndex == 0) {
                        io.updateViewOfMeter(dataList);
                    } else if (stacks.currentIndex == 4){
                        ioInputEQ.updateViewOfMeter(dataList);
                    }
                } else if ((index = strRet.indexOf('output_detect_gain?')) > -1) {
                    dataList = strRet.substring(index + 19).split(',');
                    if (stacks.currentIndex == 0 || stacks.currentIndex == 1) {
                        rep_outgrp.updateViewOfMeter(dataList);
                    } else if (stacks.currentIndex == 3) {
                        sf.updateViewOfMeter(dataList);
                    }
                } else /*if (strRet.indexOf('input_gain?') === 0)*/ {
                    Ams.loadCurConfigModeRespParse(strRet);
                    if (strRet.indexOf('input_gain?') === 0) {
                        io.updateViewOfInputVolume(); //刷新显示输入源音量
                    }
                }

                //console.log("cmdIdx = " + cmdIdx + ", lastestCmdIdx = " + lastestCmdIdx);
                if (cmdIdx === lastestCmdIdx) {
                    lastestCmdIdx = -1;
                    if (isMeterEnabled) {
                        timer_meter.start();
                    }
                }
            }
        }

        SettingFrame{
            id:sf
            anchors.fill: parent
            visible: root.isSetting
            hasMeter: io.hasMeter
            signal handleData(int cmdIdx, string strRet);

            onSettingChanged: {
                console.log("setting changed because:"+setting_changed_reason);
                switch(setting_changed_reason)
                {
                }
            }

            onBusyStateChanged: {
                console.log("busyStateChanged:"+isBusy+tip);
                if (isBusy) {
                    busyView.show(tip);
                } else {
                    busyView.hide();
                }
            }

            onToast: {
                toast.show(tip);
            }

            onUpdateClick: {
                console.log("onUpdateClick--->idx="+idx+","+softV+","+softTips+","+firmV/*+","+firmTips*/);
                switch(idx){
                case sf.soft://软件有升级
                    md_online_upd.showDias(softV,qsTr("软件")+qsTr("更新"),qsTr("发现")+qsTr("新软件版本：")/*+"V"*/+softV+"\n\n"+qsTr("更新信息：")+"\n"+softTips+"\n\n"+qsTr("请到官网更新"));
                    break;
                case sf.firm_pc://本地升级固件
                    //更新固件
                    console.log("---hidIO.isEnd-?>"+hidIO.isEnd+",hidIO.isChange="+hidIO.isChange)

                    if(hidIO.isChange){
                        showCloseDias(qsTr("警告"),qsTr("模式未保存，是否继续？"),4);
                    }else{
                        showCloseDias(qsTr("固件")+qsTr("更新"),qsTr("发现")+qsTr("新固件版本：")/*+"V"*/+firmV+"("+getLoaclFirmBuildCode()+")\n\n"+qsTr("更新信息：")+"\n"+firmTips+"\n\n"+qsTr("确认升级吗？"),3);
                    }

                    //
                    break;
                case sf.firm_cloud://下载新的pc端内包含固件
                    md_online_upd.showDias(softV,qsTr("软件")+qsTr("更新"),qsTr("发现")+qsTr("新软件版本：")/*+"V"*/+softV+"\n\n"+qsTr("更新信息：")+"\n"+softTips+"\n\n"+qsTr("发现")+qsTr("新固件版本：")/*+"V"*/+firmV+"\n\n"+qsTr("更新信息：")+"\n"+firmTips+"\n\n"+qsTr("请到官网更新"));
                    break;
                case sf.latest:
                    break;
                case sf.chekupd:
                    getVer(Ams.getDeviceType());
                    break;
                }
            }

            onDac_filter_shape_setting: {
                dac_filter_shape_setting_frm.open();
            }

            onFactory_reset: {
                reset_warning_frm.callbackHandler = reset_warning_frm.openResetTimeoutDialog;
                reset_warning_frm.openWithPolicy(Popup.CloseOnEscape | Popup.CloseOnPressOutside);
            }

            onCon_pwd_setting: {
                passwd_set_frame.open();
            }

            onCan_ctrl_setting: {
                can_ctrl_settings_win.open();
            }

            onNoise_threshold_setting: {
                noise_threshold_setting_frm.open();
            }

            onPower_off_delay_setting: {
                power_off_delay_setting_frm.open();
            }

            onUpgrade_A2B_board_by_internal: {
                fileDialog_upgrade_A2B_board.callback = null;
                fileDialog_upgrade_A2B_board.byInternal = true; //标识为使用内部固件升级
                if(hidIO.isChange){
                    showCloseDias(qsTr("警告"),qsTr("模式未保存，是否继续？"),5);
                } else {
                    //fileDialog_upgrade_A2B_board.startUpgradeA2B(true);
                    //zr_download.downloadA2BFirmwareOrStartUpgrade();
                    showCloseDias("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件")+qsTr("更新"),qsTr("发现")+qsTr("新固件版本：")+hidIO.readInternalA2BIAPFirmwareVersion(false)+"\n\n"+qsTr("更新信息：")+"\n"+root.getFirmTips_A2B()+"\n\n"+qsTr("确认升级吗？"),6);
                }
            }

            onUpgrade_A2B_board: {
                fileDialog_upgrade_A2B_board.callback = null;
                if(hidIO.isChange){
                    fileDialog_upgrade_A2B_board.byInternal = false; //标识为使用外置固件升级
                    showCloseDias(qsTr("警告"),qsTr("模式未保存，是否继续？"),6);
                } else {
                    fileDialog_upgrade_A2B_board.visible = true; //显示A2BIAP升级弹窗
                }
            }

            onShow_A2B_init_correct_info: {
                query_can.readAndShowA2BInitCorrectInfo();
            }

            onHandleData: {
                hidIO.isEnd=false;
                hidIO.isChange=false;
                if (!Ams.isDevRebootForBootloader()) {
                    dev_state.isIdentified = false; //标识为未识别设备以重新同步数据
                    if (Ams.getPwdCheckedState() === 1) {
                        Ams.setPwdCheckedState(2); //密码已被还原操作清空
                        //hidIO.syncData();
                        hidIO.statusCmdIdx = Ams.getDeviceStatusReq(hidIO);
                    } else {
                        busyView.modalShow(qsTr("设备识别中，请稍候..."));
//                        hidIO.devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO);
                        Ams.devCheckPwd(pwd_frame_okButton, ""); //校验空连接密码获取状态（成功后会调用：devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO)）
                    }
                } else {
                    if (strRet.indexOf("fail") != -1) {
                        hidIO.isEnd=true;
                        busyView.show(qsTr("固件升级失败")+qsTr("，请重启设备再试。"))
                        return;
                    }
                    Ams.refreshIsNeedResetConfigAfterLastestUpgrade();
                    Ams.devReboot(null);
                }
            }

            FileDialog {
                id: fileDialog_load_mode
                property string file: "./default.ghcx"
                title: qsTr("请选择要加载的配置文件")
                //  folder: shortcuts.home
                nameFilters: Ams.isForCDT() ? [ /*qsTr*/"DSP cfg files (*.dspcx)"] : [ "GoldHorn cfg files (*.ghcx)"]
                property int lastCmdIdx: -1;
                property var modeList: []
                property int itemIndex: 0
                property int currentMode: -1
                signal intputEnd();
                signal transStatusChanged(int errorCode);
                signal transProgressChanged(int dealedSize, int totalSize);

                onIntputEnd: {
                    passwd_input_frame.call_back_target=null;
                    //console.log("user password:"+local_root.password);

                    var errorCode = hidIO.readAndCheckSendFileHeadModeInfo(row_menu.password);
                    if (errorCode != 0) {
                        console.log("call 'readAndCheckSendFileHeadModeInfo' return false!");
                        //busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("文件校验失败！") + "(" + qsTr("错误码：") + errorCode + ")");
                        return;
                    }

                    var cmpVersion = "1.0.0";
                    if ((Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readDeviceVersion(), "1.3.x") >= 0)) {
                        cmpVersion = "1.0.1";
                    }
                    var readVersion = hidIO.readSendFileHeadModeInfoVersion();
                    if (Ams.versionCmp(readVersion, cmpVersion) != 0) {
                        console.log("version cmp false!");
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("配置文件版本与当前设备不匹配！") + "(V" + readVersion + ")");
                        return;
                    }

                    if (!hidIO.checkSendFileHeadModeSize(Ams.getModeSize())) {
                        console.log("call 'checkSendFileHeadModeSize' return false!");
                        //busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("配置文件与当前设备不匹配！"));
                        return;
                    }

//                    if (!hidIO.checkSendFileHeadModelID(Ams.A2BMainModelID, Ams.A2BSubModelID)) {
//                        console.log("call 'checkSendFileHeadModelID' return false!");
//                        //busyView.hide();
//                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("配置文件与当前车型不匹配！"));
//                        return;
//                    }

                    var devInfoList = hidIO.readSendFileHeadDeviceInfoString().split(","); //格式：GDxxxxxx,123456789012345678,999.999.999,,999.999.999,123456
                    if(devInfoList.length < 1) {
                        console.log("call 'readSendFileHeadDeviceInfoString' return false!");
                        //busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("文件识别失败！"));
                        return;
                    }
                    //console.log("devInfoList: " + JSON.stringify(devInfoList));
                    var desDevType = devInfoList[0];
                    var desVersion = devInfoList[4];
                    if (Ams.getDeviceType() !== desDevType
                            || (Ams.getDeviceType() === Ams.AB216_U && Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.x") >= 0 && Ams.versionCmp(desVersion, "1.1.x") < 0)
                            || (Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.3.x") >= 0 && Ams.versionCmp(desVersion, "1.3.x") < 0)) { //型号不匹配或者为特定型号升级前的配置文件则不允许载入
                        //busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("配置文件与当前设备不匹配！"));
                        return;
                    }

                    modeList = hidIO.readSendFileBodyModeNameInfoList().split("?");
                    itemIndex = 0;
                    //console.log("mode list: " + JSON.stringify(modeList));
                    if (modeList.length < 1) {
                        console.log("call 'readSendFileBodyModeNameInfoList' return false!");
                        //busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("文件识别失败！"));
                        return;
                    }

                    timer_meter.setMeterEnable(false); //关闭增益检测
                    busyView.show(qsTr("传输准备中，") + qsTr("请稍候..."));

                    hidIO.isEnd=false;
                    hidIO.isChange=false;
                    Ams.devResetConfig(fileDialog_load_mode); //还原出厂配置
                    startWriteModeItem();

                    row_menu.current_cfg_file=file;
                }

                onVisibleChanged: {
                    if (visible) {
                        busyView.show(qsTr("请稍候..."));
                    } else {
                        busyView.hide();
                    }
                }

                onAccepted: {
                    loadFile.savedFolder = saveFile.folder = fileDialog_load_mode.folder = fileDialog_save_mode.folder = fileUrl.toLocaleString().substring(0, fileUrl.toLocaleString().lastIndexOf('/')); //必须赋值一次，否则再次弹出时目录不切换，是Qt的Bug？
//                    busyView.show("载入中，请稍候...");
                    console.log("---------onAccepted---------");
                    file=fileUrl;
                    file=file.substring(8);//substract 'file:///'
                    //row_menu.current_cfg_file=file;

                    hidIO.setSendFilePath(file);

                    passwd_input_frame.title=qsTr("请输入密码：")
                    passwd_input_frame.call_back_target=fileDialog_load_mode;
                    passwd_input_frame.open();
                }
                onRejected: {
                    console.log("---------onRejected---------");
                    console.log("Canceled")
                }

                onTransStatusChanged: {
                    if (errorCode != 0) {
                        console.error("Error: " + hidIO.errorString);
                        busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("模式传输失败！") + "(" + qsTr("错误码：") + errorCode + ")");
                    } else {
                        //console.error("onTransStatusChanged: " + errorCode);
                        if (!startWriteModeItem()) {
                            //busyView.hide();
                            //msgBox_universal.showDiasi(qsTr("模式传输"), qsTr("模式载入完成！"), StandardIcon.Information);
                            busyView.show(qsTr("模式载入完成！") + (settings.lang == "cn" ? "" : " ") + qsTr("请稍候..."));

                            /* 使能载入列表中的第一个模式 */
                            var item = modeList[0];
                            var index = item.indexOf(":");
                            var mode = parseInt(item.substring(0, index));
                            Ams.enableConfigModeReq(hidIO, mode); //使能模式
                            hidIO.loadCmdIdx = Ams.loadCurConfigModeReq(hidIO); //开始加载当前配置模式数据
                        }
                    }
                }

                onTransProgressChanged: {
                    busyView.showProgress(qsTr("模式") + (currentMode + 1) + (settings.lang == "cn" ? "" : " ") + qsTr("载入中，请勿断开设备..."), parseInt(dealedSize * 100 / totalSize));
                }

                function startWriteModeItem() {
                    if (itemIndex >= modeList.length) {
                        return false;
                    }

                    var item = modeList[itemIndex++];
                    var index = item.indexOf(":");
                    currentMode = parseInt(item.substring(0, index));

                    lastCmdIdx = Ams.devWriteMode(fileDialog_load_mode, currentMode, row_menu.password);
                    return true;
                }

                function handleData(cmdIdx, strRet) {
                    if (cmdIdx == lastCmdIdx) {
                        lastCmdIdx = -1;

                        var index;
                        var errorCode = 0;
                        if ((index = strRet.indexOf("error?")) > -1) {
                            errorCode = parseInt(strRet.substring(index + 6));
                            busyView.hide();
                            msgBox_universal.showDias(qsTr("模式传输"), qsTr("模式传输失败！") + "(" + qsTr("错误码：") + errorCode + ")");
                            return;
                        }

                        if (!hidIO.prepareToSendMode(currentMode)) {
                            console.log("call 'prepareToSendMode' return false!");
                            busyView.hide();
                            msgBox_universal.showDias(qsTr("模式传输"), qsTr("文件识别失败！"));
                            return;
                        }

                        hidIO.transFileCallback = fileDialog_load_mode;
                        hidIO.reqSendFile();
                    }
                }
            }

            FileDialog {
                id: fileDialog_save_mode
                property string file: "./default.ghcx"
                title: qsTr("请选择要保存的文件名")
                selectExisting:false
                // folder: shortcuts.home
                nameFilters: Ams.isForCDT() ? [ /*qsTr*/"DSP cfg files (*.dspcx)"] : [ "GoldHorn cfg files (*.ghcx)"]
                property var modeList: []
                property int itemIndex: 0
                property int currentMode: -1
                property bool isLastestMeterEnabled: false //最近一次的增益检测开关状态
                signal intputEnd();
                signal transStatusChanged(int errorCode);
                signal transProgressChanged(int dealedSize, int totalSize);

                onIntputEnd: {
                    passwd_input_frame.call_back_target=null;
                    //console.log("user password:"+local_root.password);
                    fileDialog_save_mode.visible=true;
                }

                onVisibleChanged: {
                    if (visible) {
                        busyView.show(qsTr("请稍候..."));
                    } else {
                        busyView.hide();
                    }
                }
                onAccepted: {
                    loadFile.savedFolder = saveFile.folder = fileDialog_load_mode.folder = fileDialog_save_mode.folder = fileUrl.toLocaleString().substring(0, fileUrl.toLocaleString().lastIndexOf('/')); //必须赋值一次，否则再次弹出时目录不切换，是Qt的Bug？
//                    busyView.show(qsTr("保存中，请稍候..."));

                    file=fileUrl;
                    file=file.substring(8);
                    row_menu.current_cfg_file=file;
//                    //busyView.hide();

                    busyView.show(qsTr("传输准备中，") + qsTr("请稍候..."));

                    hidIO.setRecvFilePath(file);

                    modeList = Ams.getValidConfigModes();
                    itemIndex = 0;
//                    if (modeList.length < 1) {
//                        busyView.hide();
//                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("模式列表为空！"));
//                        return;
//                    }

                    var isNewVersion = (Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readDeviceVersion(), "1.3.x") >= 0) ? true : false;
                    if (!hidIO.writeRecvFileHeadModeInfo(row_menu.password, isNewVersion, Ams.getModeSize(), modeList.length, Ams.A2BMainModelID, Ams.A2BSubModelID, Ams.getDeviceType() + "," +  root.getRemapDeviceSN() + "," + Ams.readDeviceVersion() + ",," + Ams.readFirmwareVersion() + "," + Ams.getFirmwareCode())) {
                        busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("文件写入失败！"));
                        return;
                    }

                    isLastestMeterEnabled = timer_meter.isMeterEnabled;
                    timer_meter.setMeterEnable(false); //关闭增益检测
                    startReadModeItem();
                }
                onRejected: {
                    console.log("Canceled")
                }

                onTransStatusChanged: {
                    if (errorCode != 0) {
                        console.error("Error: " + hidIO.errorString);
                        busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("模式传输失败！") + "(" + qsTr("错误码：") + errorCode + ")");
                        if (isLastestMeterEnabled) {
                            timer_meter.setMeterEnable(true); //开启增益检测
                        }
                    } else {
                        //console.error("onTransStatusChanged: " + errorCode);
                        if (!startReadModeItem()) {
                            busyView.hide();
                            msgBox_universal.showDiasi(qsTr("模式传输"), qsTr("模式导出完成！"), StandardIcon.Information);
                            if (isLastestMeterEnabled) {
                                timer_meter.setMeterEnable(true); //开启增益检测
                            }
                        }
                    }
                }

                onTransProgressChanged: {
                    busyView.showProgress(qsTr("模式") + (currentMode + 1) + (settings.lang == "cn" ? "" : " ") + qsTr("导出中，请勿断开设备..."), parseInt(dealedSize * 100 / totalSize));
                }

                function startReadModeItem() {
                    if (itemIndex >= modeList.length) {
                        return false;
                    }

                    currentMode = modeList[itemIndex++];
                    Ams.devReadMode(fileDialog_save_mode, currentMode, row_menu.password);
                    return true;
                }

                function handleData(cmdIdx, strRet) {
                    var index;
                    var errorCode = 0;
                    if ((index = strRet.indexOf("error?")) > -1) {
                        errorCode = parseInt(strRet.substring(index + 6));
                        busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("模式传输失败！") + "(" + qsTr("错误码：") + errorCode + ")");
                        return;
                    }

                    if (!hidIO.writeRecvFileBodyModeNameInfo(currentMode, Ams.getConfigModeName(currentMode))) {
                        busyView.hide();
                        msgBox_universal.showDias(qsTr("模式传输"), qsTr("文件写入失败！"));
                        return;
                    }

                    hidIO.transFileCallback = fileDialog_save_mode;
                    hidIO.reqRecvFile();
                }
            }

            function isTransModeCallback(callback) {
                if (callback == fileDialog_save_mode || callback == fileDialog_load_mode) {
                    return true;
                }
                return false;
            }

            /* ESS DAC 滤波器配置 */
            Popup {
                id:dac_filter_shape_setting_frm;
                x: (root.width-width)/ 2-dac_filter_shape_setting_frm.padding
                y: (root.height-height)/2-dac_filter_shape_setting_frm.padding-16
                padding: 32
                width: isCnLang()?260:440
                height: 270
                //closePolicy:Popup.NoAutoClose
                implicitWidth: width
                implicitHeight: height
                modal: true
                background: Rectangle {
                    width: parent.width
                    height: parent.height
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }
                }

                onOpened: {
                    rep_dac_filter_shapes.updateView();
                }

                ButtonGroup {
                    id: btn_group_dac_filter_shapes
                }

                Column {
                    id: col_dac_filter_shapes
                    anchors.centerIn: parent
                    anchors.verticalCenterOffset: -30
                    spacing: 10

                    Repeater {
                        id: rep_dac_filter_shapes
                        //model: ["FAL:" + qsTr("线性相位快速滚降"), "SLL:" + qsTr("线性相位慢速滚降"), "FAM:" + qsTr("最小相位快速滚降"), "SLM:" + qsTr("最小相位慢速滚降"), "APOD:" + qsTr("线性相位快速切换"), "HYER:" + qsTr("最小相位快速混合"), "BRIC:" + qsTr("线性相位转移")]
                        //model: [qsTr("线性相位快速滚降") + "(FAL)", qsTr("线性相位慢速滚降") + "(SLL)", qsTr("最小相位快速滚降") + "(FAM)", qsTr("最小相位慢速滚降") + "(SLM)", qsTr("线性相位快速切换") + "(APOD)", qsTr("最小相位快速混合") + "(HYER)", qsTr("线性相位转移") + "(BRIC)"]
                        model: [qsTr("线性相位快速滚降"), qsTr("线性相位慢速滚降"), qsTr("最小相位快速滚降") + qsTr("(默认)"), qsTr("最小相位慢速滚降"), qsTr("线性相位快速切换"), qsTr("最小相位快速混合"), qsTr("线性相位转移")]
                        property bool isUpdateView: false
                        property int currentIndex: 0

                        function updateView() {
                            rep_dac_filter_shapes.isUpdateView = true;
                            rep_dac_filter_shapes.itemAt(Ams.getDacFilterShape()).checked = true;
                            rep_dac_filter_shapes.isUpdateView = false;
                        }

                        delegate: Item {
                            width: radioButton_dac_filter_shape.width + text_dac_filter_shape.width
                            height: 14
                            property alias checked: radioButton_dac_filter_shape.checked

                            RadioButton {
                                id: radioButton_dac_filter_shape
                                padding: 0
                                ButtonGroup.group: btn_group_dac_filter_shapes
                                font.pixelSize: 12
                                focusPolicy: Qt.NoFocus
                                property int idx:index

                                indicator: Image {
                                    anchors.centerIn: parent
                                    source: "qrc:///image/images/unchecked.png"

                                    Image {
                                        anchors.centerIn: parent
                                        source: "qrc:///image/images/checked.png"
                                        visible: radioButton_dac_filter_shape.checked
                                    }
                                }

                                onCheckedChanged: {
                                    if (checked) {
                                        rep_dac_filter_shapes.currentIndex = index;
                                    }

                                    if (rep_dac_filter_shapes.isUpdateView) {
                                        return;
                                    }

                                    if (checked) {
                                        Ams.setDacFilterShape(radioButton_dac_filter_shape, index);
                                    }
                                }
                            }

                            Text {
                                id: text_dac_filter_shape
                                anchors.left: radioButton_dac_filter_shape.right
                                anchors.verticalCenter: radioButton_dac_filter_shape.verticalCenter
                                anchors.verticalCenterOffset: -2
                                font.bold: settings.fontBold
                                font.pixelSize: 14
                                color: radioButton_dac_filter_shape.checked?"#fc7e24":"#90bcea"
                                text: modelData
                            }

                            MouseArea {
                                anchors.fill: parent

                                onClicked: {
                                    radioButton_dac_filter_shape.checked = true;
                                }
                            }
                        }
                    }
                }

                AmsButton4 {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.bottom: parent.bottom
                    width: 100
                    txt:qsTr("确认")
                    onClicked: {
                        dac_filter_shape_setting_frm.close();
                    }
                }
            }
            /* 还原出厂配置警告弹窗 */
            Popup {
                id:reset_warning_frm;
                x: (root.width-width)/ 2-reset_warning_frm.padding
                y: (root.height-height)/2-reset_warning_frm.padding-16
                padding: 32
                width: (settings.lang == "pt" || settings.lang == "es") ? 850 : (settings.lang == "cn" ? 500 : 750)
                height: 130
                //        closePolicy:Popup.NoAutoClose
                implicitWidth: width
                implicitHeight: height
                modal: true
                property var callbackHandler: null

                background:Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }

                    /* 用于阻止光标变成底层窗口的输入框光标、拖动光标等 */
                    MouseArea {
                        anchors.fill: parent
                        enabled: reset_warning_frm.visible
                    }
                }
                onOpened: {
                    timer_twinkle.start();
                    io.isToolTipVisibleEnabled = false;
                    confirm_text.text="";
                    confirm_text.forceActiveFocus();
                }
                onClosed: {
                    timer_twinkle.stop();
                    io.isToolTipVisibleEnabled = true;
                    confirm_text.text="";
                }
                function openWithPolicy(policy) {
                    closePolicy = policy;
                    open();
                }

                function openResetTimeoutDialog() {
                    reset_timeout_frm.open();
                }

                function openLoadModeDialog() {
                    if (Ams.isDebug || Ams.isDemoMode()) {
                        toast.show(qsTr("未连接设备！"));
                        return;
                    }

                    fileDialog_load_mode.visible=true;
                }

                /* 显示文字提示 */
                Text {
                    id:tipText
                    x:0
                    y:0
                    color: timer_twinkle.isBright ? "#fa7f1d" : "#93bced"
                    font.pixelSize: 18
                    font.bold: true
                    text:qsTr("该操作会删除所有模式数据！") + (settings.lang == "cn" ? "" : " ") + qsTr("继续请输入(yes)：");
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -confirm_text.width / 2
                    anchors.top: parent.top
                }
                TextField {
                    id: confirm_text
                    width: isCnLang() ? 40 : 50
                    height: 24
                    anchors.verticalCenter: tipText.verticalCenter
                    anchors.verticalCenterOffset: 1
                    anchors.left: tipText.right
                    maximumLength: 3
                    font.bold: settings.fontBold
                    font.pixelSize: 14
                    color: "#fc7e24"
                    verticalAlignment: Text.AlignVCenter
                    //                        selectByMouse: rb.checked
                    //                        readOnly: !rb.checked
                    validator: RegExpValidator{regExp:/[A-Za-z]+/}
                    background: Rectangle{
                        id:tx_bkg
                        width: parent.width
                        height: parent.height
                        radius: 5
                        gradient: Gradient {
                            GradientStop { position: 0 ; color: "#0e151e" }
                            GradientStop { position: 1 ; color:"#314a68" }
                        }
                        //                                color: "yellow"
                        border.width: 1
                        border.color: "#4b5359"
                    }
                    //                        onActiveFocusChanged: {
                    //                            if (activeFocus) {
                    //                                mouse.visible = true;
                    //                            }
                    //                        }
                    //                        MouseArea {
                    //                            id: mouse
                    //                            anchors.fill: parent
                    ////                            hoverEnabled: true
                    //                            visible: false
                    //                            onClicked: {
                    //                                rb.checked = true;
                    //                                visible = false;
                    //                            }
                    //                        }
                }

                AmsButton4{
                    id:ab3_ok
                    anchors.topMargin: 16
                    anchors.top: confirm_text.bottom
                    //                        anchors.verticalCenter: parent.verticalCenter
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -ab3_cancle.width/2-16
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("确认")
                    onClicked: {
                        if(confirm_text.text!=""&&confirm_text.text.toLowerCase()=="yes"){
                            confirm_text.text="";

                            reset_warning_frm.close();

                            if (reset_warning_frm.callbackHandler != null) {
                                reset_warning_frm.callbackHandler();
                            }
                        }
                    }
                }
                AmsButton4{
                    id:ab3_cancle
                    anchors.top: confirm_text.bottom
                    anchors.topMargin: 16
                    anchors.leftMargin: 16
                    anchors.left: ab3_ok.right
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("取消")
                    onClicked: {
                        reset_warning_frm.close();
                        confirm_text.text="";
                        if (Ams.getPwdCheckedState() < 1) {
                            if (Ams.isDebug || Ams.isDemoMode()) {
                                return;
                            }
                            busyView.modalShow(qsTr("设备识别中，请稍候..."));
                            hidIO.devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO);
                        }
                    }
                }
            }
            Popup {
                id:reset_timeout_frm;
                x: (root.width-width)/ 2-reset_timeout_frm.padding
                y: (root.height-height)/2-reset_timeout_frm.padding-16
                padding: 32
                width: isCnLang()?500:750
                height: 130
                closePolicy:Popup.NoAutoClose
                implicitWidth: width
                implicitHeight: height
                modal: true
                property int delay_s: 10 //10秒延时
                background:Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }

                    /* 用于阻止光标变成底层窗口的输入框光标、拖动光标等 */
                    MouseArea {
                        anchors.fill: parent
                        enabled: reset_timeout_frm.visible
                    }
                }
                onOpened: {
                    timer_twinkle.start();
                    io.isToolTipVisibleEnabled = false;
                    reset_timeout_frm.focus = true;
                    delay_s = 10;
                    ab3_timeout_ok.enabled = false;
                    ab3_timeout_ok.txt = qsTr("确认") + " (" + delay_s + ")";
                    delay_timer.start();
                }
                onClosed: {
                    timer_twinkle.stop();
                    io.isToolTipVisibleEnabled = true;
                    delay_timer.stop();
                }


                /* 显示文字提示 */
                Text {
                    id:timeout_tipText
                    x:0
                    y:0
                    color: timer_twinkle.isBright ? "#fa7f1d" : "#93bced"
                    font.pixelSize: 18
                    font.bold: true
                    text:qsTr("该操作会删除所有模式数据！");
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: parent.top
                }

                AmsButton4{
                    id:ab3_timeout_ok
                    enabled: false
                    anchors.topMargin: 20
                    anchors.top: timeout_tipText.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -ab3_timeout_cancle.width/2-16
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("确认")
                    //tooltip: qsTr("确认")
                    onClicked: {
                        enabled = false;
                        delay_timer.stop();
                        ab3_timeout_ok.txt = qsTr("确认");
                        Ams.devResetConfig(sf);
                        if (Ams.isDebug || Ams.isDemoMode()) {
                            enabled = true;
                            reset_timeout_frm.close();
                            return;
                        }
                        busyView.modalShow(qsTr("还原中，") + qsTr("请稍候..."));
                    }
                }
                AmsButton4{
                    id:ab3_timeout_cancle
                    anchors.top: timeout_tipText.bottom
                    anchors.topMargin: 20
                    anchors.leftMargin: 16
                    anchors.left: ab3_timeout_ok.right
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("取消")
                    //tooltip: qsTr("取消")
                    onClicked: {
                        reset_timeout_frm.close();
                        confirm_text.text="";
                        if (Ams.getPwdCheckedState() < 1) {
                            if (Ams.isDebug || Ams.isDemoMode()) {
                                return;
                            }
                            busyView.modalShow(qsTr("设备识别中，请稍候..."));
                            hidIO.devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO);
                        }
                    }
                }
                /* 定时器用于避免值更新过于频繁 */
                Timer {
                    id: delay_timer
                    running: false
                    repeat: true
                    triggeredOnStart: true
                    interval: 1000 //间隔1秒执行一次
                    onTriggered: {
                        if (reset_timeout_frm.delay_s > 0) {
                            ab3_timeout_ok.txt = qsTr("确认") + " (" + reset_timeout_frm.delay_s + ")";
                            reset_timeout_frm.delay_s--;
                        } else {
                            stop();
                            ab3_timeout_ok.txt = qsTr("确认");
                            ab3_timeout_ok.enabled = true;
                        }
                    }
                }
            }
            /*噪声门限设置*/
            Popup {
                id:noise_threshold_setting_frm;
                x: (root.width-width)/ 2-noise_threshold_setting_frm.padding
                y: (root.height-height)/2-noise_threshold_setting_frm.padding-16
                padding: 20
                width: 500
                height: 150
                //        closePolicy:Popup.NoAutoClose
                implicitWidth: width
                implicitHeight: height
                modal: true
                background: Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }
                }

                onOpened: {
                    noise_threshold_setting_frm.forceActiveFocus();
                    output_mute_sensitive.updateView(Ams.getNoiseThresholdSensitivity());
                    output_mute_release_time.updateView(Ams.getNoiseThresholdReleaseTime() / 10);
                    label_closed.visible = (output_mute_sensitive.readValue <= -120);
                }

                AmsSlideFrame {
                    id:output_mute_sensitive
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -20
                    anchors.top: parent.top
                    titleWidth: (settings.lang == "pt" || settings.lang == "es") ? 80 : 70
                    title: qsTr("灵敏度")
                    unit: "dB"
                    maximumValue: -20
                    minimumValue: -120
                    maximumLength: 4
                    inputValidator:DoubleValidator{bottom:-120.0;top:-20.0;decimals:1;}
                    onValueChanged: {
                        Ams.setNoiseThresholdSensitivity(output_mute_sensitive, value);
                        label_closed.visible = (output_mute_sensitive.readValue <= -120);
                    }

                    Label{
                        id: label_closed
                        anchors.centerIn: output_mute_sensitive.id_input_pos
                        visible: false
                        font.pixelSize: 14
                        font.bold: settings.fontBold
                        color: "#91bced"
                        text: qsTr("关闭")

                        background: Rectangle {
                            anchors.centerIn: parent
                            width: output_mute_sensitive.id_input_pos.width
                            height: output_mute_sensitive.id_input_pos.height
                            radius: output_mute_sensitive.id_input_pos.radius
                            gradient: Gradient {
                                GradientStop { position: 0.0; color: "#14181b" }
                                GradientStop { position: 1.0; color: "#1c2a3b" }
                            }
                        }
                    }
                }

                AmsSlideFrame {
                    id:output_mute_release_time
                    anchors.left: output_mute_sensitive.left
                    anchors.top: output_mute_sensitive.bottom
                    anchors.topMargin: 15
                    titleWidth: (settings.lang == "pt" || settings.lang == "es") ? 80 : 70
                    title: qsTr("启动时间")
                    unit:"s"
                    maximumValue: 5
                    minimumValue: 0.5
                    stepSize: 0.1
                    maximumLength: 3
                    decimals: 1
                    inputValidator:DoubleValidator{bottom:0.5;top:0.5;decimals:1;}
                    onValueChanged: {
                        Ams.setNoiseThresholdReleaseTime(output_mute_release_time, parseInt(value * 10));
                    }
                }

                AmsButton4 {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -5
                    anchors.bottom: parent.bottom
//                    anchors.bottomMargin: 5
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("确认")
                    onClicked: {
                        noise_threshold_setting_frm.close();
                    }
                }
            }
            /* 设置连接密码 */
            Popup {
                id:passwd_set_frame;
                width: (settings.lang == "pt" || settings.lang == "es") ? 480 : (isCnLang()?344:400)
                height: 260
                implicitWidth: width
                implicitHeight: height
                x: (root.width-width)/ 2
                y: (root.height-height)/2-36
                property var validator: RegExpValidator{regExp:/[A-Za-z0-9_]+/}
        //                closePolicy:Popup.NoAutoClose
                // width: Math.min(root.width, root.heigh) / 3 * 2
                //leftMargin: 21
                modal: true
                background:Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }

                    /* 用于阻止光标变成底层窗口的输入框光标、拖动光标等 */
                    MouseArea {
                        anchors.fill: parent
                        enabled: passwd_set_frame.visible
                    }
                }
                onOpened: {
                    io.isToolTipVisibleEnabled = false;
                    input_cur_pwd.text = "";
                    input_new_pwd1.text = "";
                    input_new_pwd2.text = "";
                    console.log("Ams.getPwdCheckedState() = " + Ams.getPwdCheckedState());
                    if (Ams.getPwdCheckedState() === 2) { //原密码为空的情况
                        cur_pwd_rec.enabled = false;
                        input_new_pwd1.forceActiveFocus();
                    } else {
                        cur_pwd_rec.enabled = true;
                        input_cur_pwd.forceActiveFocus();
                    }

                }
                onClosed: {
                    cur_pwd_tip.hide();
                    new_pwd_tip2.hide();
                    io.isToolTipVisibleEnabled = true;
                }
                //focus: true
                property var call_back_target;
                property var labelWidth: (settings.lang == "pt" || settings.lang == "es") ? 200 : (isCnLang()?105:150)
                contentItem: ColumnLayout {
                    spacing: 25
                    //anchors.fill: parent
                    Rectangle {
                        id:cur_pwd_rec
                        height: 36
        //                        width:200
        //                        spacing: 10
                        anchors.left: parent.left
                        anchors.leftMargin: 40
                        anchors.top: parent.top
                        anchors.topMargin: 30
                        Label {
                            id: cur_pwd_label
                            anchors.top: parent.top
                            anchors.left: parent.left
                            width: passwd_set_frame.labelWidth
                            text: qsTr("请输入原密码：");
                            font.bold: settings.fontBold
                            font.pixelSize: 14
                            color: cur_pwd_rec.enabled?"#90bcea":"#5a646e"
                        }
                        TextField {
                            id: input_cur_pwd
                            width: (settings.lang == "pt" || settings.lang == "es") ? 160 : 120
                            height: 36
                            anchors.verticalCenter: cur_pwd_label.verticalCenter
                            anchors.left: cur_pwd_label.right
                            anchors.leftMargin: 3
                            maximumLength: 8
                            color: text.length > 0?"#90bcea":"#495458"
                            placeholderText:'<font size="12px">'+(settings.fontBold?'<strong>':'')+ qsTr("请输入8位密码")+(settings.fontBold?'</strong>':'')+'</font>'
                            echoMode:TextInput.Password
                            verticalAlignment: Text.AlignVCenter
                            validator: passwd_set_frame.validator
                            selectByMouse: true
                            background: Rectangle{
                                width: parent.width
                                height: parent.height
                                gradient: Gradient {
                                    GradientStop { position: 0 ; color: "#0e151e" }
                                    GradientStop { position: 1 ; color:"#314a68" }
                                }
        //                                color: "yellow"
                                border.width: 1
                                border.color: "#4b5359"
                            }
                            onTextChanged: {
                                cur_pwd_tip.hide();
                                new_pwd_tip2.hide();
                            }
                        }
                        Label {
                            id: cur_pwd_tip
                            anchors.top: input_cur_pwd.bottom
                            anchors.topMargin: 5
                            anchors.left: input_cur_pwd.left
                            visible: false
                            text: "" //qsTr("密码错误，请重新输入！");
                            font.bold: settings.fontBold
                            font.pixelSize: 12
                            color: "red"
                            function show(tip) {
                                text = tip;
                                visible = true;
                            }
                            function hide() {
                                text = "";
                                visible = false;
                            }
                        }
                    }
                    Rectangle {
                        id:new_pwd_rec1
                        height: 36
        //                        width:200
        //                        spacing: 10
                        anchors.left: parent.left
                        anchors.leftMargin: 40
                        anchors.top: cur_pwd_rec.bottom
                        anchors.topMargin: 25
                        Label {
                            id: new_pwd_label1
                            anchors.top: parent.top
                            anchors.left: parent.left
                            width: passwd_set_frame.labelWidth
                            text: qsTr("请输入新密码：");
                            font.bold: settings.fontBold
                            font.pixelSize: 14
                            color: "#90bcea"
                        }
                        TextField {
                            id: input_new_pwd1
                            width: (settings.lang == "pt" || settings.lang == "es") ? 160 : 120
                            height: 36
                            anchors.verticalCenter: new_pwd_label1.verticalCenter
                            anchors.left: new_pwd_label1.right
                            anchors.leftMargin: 3
                            maximumLength: 8
                            color: text.length > 0?"#90bcea":"#495458"
                            placeholderText:'<font size="12px">'+(settings.fontBold?'<strong>':'')+ qsTr("8位密码或留空")+(settings.fontBold?'</strong>':'')+'</font>'
                            echoMode:TextInput.Password
                            verticalAlignment: Text.AlignVCenter
                            validator: passwd_set_frame.validator
                            selectByMouse: true
                            background: Rectangle{
                                width: parent.width
                                height: parent.height
                                gradient: Gradient {
                                    GradientStop { position: 0 ; color: "#0e151e" }
                                    GradientStop { position: 1 ; color:"#314a68" }
                                }
        //                                color: "yellow"
                                border.width: 1
                                border.color: "#4b5359"
                            }
                            onTextChanged: {
                                cur_pwd_tip.hide();
                                new_pwd_tip2.hide();
                            }
                        }
//                        Label {
//                            id: new_pwd_tip1
//                            anchors.top: input_new_pwd1.bottom
//                            anchors.topMargin: 5
//                            anchors.left: input_new_pwd1.left
//                            visible: false
//                            text: qsTr("密码错误，请重新输入！");
//                            font.bold: settings.fontBold
//                            font.pixelSize: 12
//                            color: "red"
//                        }
                    }
                    Rectangle {
                        id:new_pwd_rec2
                        height: 36
        //                        width:200
        //                        spacing: 10
                        anchors.left: parent.left
                        anchors.leftMargin: 40
                        anchors.top: new_pwd_rec1.bottom
                        anchors.topMargin: 10
                        Label {
                            id: new_pwd_label2
                            anchors.top: parent.top
                            anchors.left: parent.left
                            width: passwd_set_frame.labelWidth
                            text: qsTr("请确认新密码：");
                            font.bold: settings.fontBold
                            font.pixelSize: 14
                            color: "#90bcea"
                        }
                        TextField {
                            id: input_new_pwd2
                            width: (settings.lang == "pt" || settings.lang == "es") ? 160 : 120
                            height: 36
                            anchors.verticalCenter: new_pwd_label2.verticalCenter
                            anchors.left: new_pwd_label2.right
                            anchors.leftMargin: 3
                            maximumLength: 8
                            color: text.length > 0?"#90bcea":"#495458"
                            placeholderText:'<font size="12px">'+(settings.fontBold?'<strong>':'')+ qsTr("8位密码或留空")+(settings.fontBold?'</strong>':'')+'</font>'
                            echoMode:TextInput.Password
                            verticalAlignment: Text.AlignVCenter
                            validator: passwd_set_frame.validator
                            selectByMouse: true
                            background: Rectangle{
                                width: parent.width
                                height: parent.height
                                gradient: Gradient {
                                    GradientStop { position: 0 ; color: "#0e151e" }
                                    GradientStop { position: 1 ; color:"#314a68" }
                                }
        //                                color: "yellow"
                                border.width: 1
                                border.color: "#4b5359"
                            }
                            onTextChanged: {
                                cur_pwd_tip.hide();
                                new_pwd_tip2.hide();
                            }
                        }
                        Label {
                            id: new_pwd_tip2
                            anchors.top: input_new_pwd2.bottom
                            anchors.topMargin: 5
                            anchors.left: input_new_pwd2.left
                            visible: false
                            text: "" //qsTr("密码错误，请重新输入！");
                            font.bold: settings.fontBold
                            font.pixelSize: 12
                            color: "red"
                            function show(tip) {
                                text = tip;
                                visible = true;
                            }
                            function hide() {
                                text = "";
                                visible = false;
                            }
                        }
                    }

                    AmsButton4 {
                        id: pwd_set_frame_okButton
                        anchors.top:new_pwd_rec2.bottom
                        anchors.topMargin: 15
                        anchors.left: parent.left
                        anchors.leftMargin: (settings.lang == "pt" || settings.lang == "es") ? 100 : (isCnLang()?40:65)
                        width: 100
                        txt:qsTr("确认")
                        property int chkCurPwdCmdIdx: -1
                        property int setNewPwdCmdIdx: -1

                        onClicked: {
                            var isCurPwdFormatOk = false;
                            var isNewPwdFormatOk = false;
                            if (cur_pwd_rec.enabled && input_cur_pwd.text.length!=8) {
                                cur_pwd_tip.show(qsTr("密码少于8位！"));
                            } else {
                                isCurPwdFormatOk = true;
                            }
                            if ((input_new_pwd1.text.length == 8 && input_new_pwd2.text.length == 8) || (input_new_pwd1.text.length == 0 && input_new_pwd2.text.length == 0)) {
                                isNewPwdFormatOk = true;
                            } else {
                                new_pwd_tip2.show(qsTr("密码少于8位！"));
                            }

                            if (!isCurPwdFormatOk || !isNewPwdFormatOk) {
                                return;
                            }

                            if (input_new_pwd1.text != input_new_pwd2.text) {
                                new_pwd_tip2.show(qsTr("新密码不一致！"));
                                return;
                            }

                            if (Ams.isDebug || Ams.isDemoMode()) {
                                passwd_set_frame.close();
                                toast.show(qsTr("未连接设备！"));
                                return;
                            }

                            hidIO.isEnd = false;
                            chkCurPwdCmdIdx = Ams.devCheckPwd(pwd_set_frame_okButton, input_cur_pwd.text);

//                            Ams.devSetPwd(pwd_set_frame_okButton, input_new_pwd2.text);
                        }
                        function handleData(cmdIdx, strRet) {
                            hidIO.isEnd = true;
                            if (cmdIdx === setNewPwdCmdIdx) {
                                setNewPwdCmdIdx = -1;
                                switch (strRet) {
                                case "ok":
                                case "empty":
                                    Ams.setPwdCheckedState(strRet==="empty"?2:1);
                                    passwd_set_frame.close();
                                    toast.show(qsTr("设置连接密码成功！"));
                                    break;
                                case "fail":
                                default:
                                    cur_pwd_tip.show(qsTr("操作失败，请稍候再试！"));
                                    break;
                                }
                            } else {
                                chkCurPwdCmdIdx = -1;
                                input_cur_pwd.forceActiveFocus();
                                switch (strRet) {
                                case "ok":
                                case "empty":
                                    Ams.setPwdCheckedState(strRet==="empty"?2:1);
                                    hidIO.isEnd = false;
                                    setNewPwdCmdIdx = Ams.devSetPwd(pwd_set_frame_okButton, input_new_pwd2.text);
                                    break;
                                case "error":
                                    Ams.setPwdCheckedState(-1);
                                    input_cur_pwd.text = "";
                                    cur_pwd_tip.show(qsTr("密码异常，请联系厂家！"));
                                    break;
                                case "fail":
                                    Ams.setPwdCheckedState(0);
                                    input_cur_pwd.text = "";
                                    cur_pwd_tip.show(qsTr("密码错误，请重新输入！"));
                                    break;
                                default:
                                    Ams.setPwdCheckedState(0);
                                    input_cur_pwd.text = "";
                                    cur_pwd_tip.show(qsTr("操作失败，请稍候再试！"));
                                    break;
                                }
                            }
                            console.log("handleData: cmdIdx = " + cmdIdx + ", strRet:" + strRet);
                        }
                    }
                    AmsButton4 {
                        anchors.top: pwd_set_frame_okButton.top
                        anchors.left: pwd_set_frame_okButton.right
                        anchors.leftMargin: 30
                        width: 100
                        txt: qsTr("取消")
                        onClicked: {
                            passwd_set_frame.close();
                        }
                    }
                    Keys.onTabPressed: {
                        console.log("passwd_set_frame Keys.onTabPressed");
                    }
                    Keys.onSpacePressed: {
                        console.log("passwd_set_frame Keys.onSpacePressed");
                    }
                    Keys.onEscapePressed: {
                        passwd_set_frame.close();
                    }
                    Keys.onEnterPressed: {
                        pwd_set_frame_okButton.clicked();
                    }
                    Keys.onReturnPressed: {
                        pwd_set_frame_okButton.clicked();
                    }
                }
            }

            Popup {
                id:power_off_delay_setting_frm;
                x: (root.width-width)/ 2
                y: (root.height-height)/2-36
                padding: 20
                width: 500
                height: 150
                //        closePolicy:Popup.NoAutoClose
                implicitWidth: width
                implicitHeight: height
                modal: true
                background: Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }
                }

                onOpened: {
                    console.log("power_off_delay_setting_frm: onOpened");
                    power_off_delay_setting_frm.forceActiveFocus();
                    //slider_power_off_delay.updateView(slider_power_off_delay.maximumValue);
                    //slider_power_off_delay.minimumValue = Ams.getMiniPowerOffDelay();
                    slider_power_off_delay.updateView(Ams.getPowerOffDelay());
                }

                AmsSlideFrame {
                    id:slider_power_off_delay
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -20
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.verticalCenterOffset: -15
                    title: qsTr("关机等待")
                    unit: "s"
                    maximumValue: 10
                    minimumValue: 1
                    maximumLength: 3
                    inputValidator:IntValidator{bottom:1;top:10.0;}
                    onValueChanged: {
                        hidIO.isEnd = false;
                        Ams.setPowerOffDelay(slider_power_off_delay, value);
                    }

                    function handleData(cmdIdx, strRet) {
                        hidIO.isEnd = true;
                    }
                }

                AmsButton4 {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -5
                    anchors.bottom: parent.bottom
//                    anchors.bottomMargin: 5
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("确认")
                    onClicked: {
                        power_off_delay_setting_frm.close();
                    }
                }
            }

            Popup {
                id: a2b_params_setting_frm
                x: (root.width-width)/ 2
                y: (root.height-height)/2-36
                padding: 20
                width: 400
                height: 150
                //closePolicy:Popup.NoAutoClose
                implicitWidth: width
                implicitHeight: height
                modal: true
                background: Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    radius: 25
                    border.width: 2
                    border.color:"#47647f"
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: "#010406" }
                        GradientStop { position: 1.0; color: "#1e3142" }
                    }
                }

                onOpened: {
                    console.log("a2b_params_setting_frm: onOpened");
                    a2b_params_setting_frm.forceActiveFocus();
                    sw_original_car_eq_enable.updateView();
                    sw_soundfield_balance_enable.updateView();
                }

                Row {
                    id: row_original_car_eq_enable
                    spacing: (settings.lang == "cn")?8:6
                    anchors.right: parent.right
                    anchors.rightMargin: (settings.lang == "cn") ? 90 : ((settings.lang == "en" || settings.lang == "pt") ? 45 : 40)
                    anchors.top: parent.top
                    anchors.topMargin: row_soundfield_balance_enable.visible ? 15 : 30
                    Text {
                        id: title_original_car_eq_enable
                        text:qsTr("原车EQ：")
                        anchors.top: parent.top
                        font.bold: settings.fontBold
                        font.pixelSize: 15 /*(settings.lang == "cn")?18:15*/
                        color:"#93bcef"
                    }
                    Item {
                        id: item_original_car_eq_enable_sw
                        anchors.verticalCenter: title_original_car_eq_enable.verticalCenter
                        width: 120
                        height: 17

                        Text {
                            text:qsTr("关闭")
                            anchors.right: sw_original_car_eq_enable.left
                            anchors.rightMargin: 6
                            anchors.verticalCenter: item_original_car_eq_enable_sw.verticalCenter
                            font.bold: settings.fontBold
                            font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                            color:sw_original_car_eq_enable.checked?"#93bcef":"#fc7e24"

                            MouseArea {
                                anchors.fill: parent

                                onClicked: {
                                    sw_original_car_eq_enable.checked = !sw_original_car_eq_enable.checked;
                                }
                            }
                        }
                        Switch {
                            id:sw_original_car_eq_enable
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.horizontalCenterOffset: (settings.lang == "cn")?1:4
                            anchors.top: parent.top;
                            width: 48
                            height: parent.height
                            indicator: Image {
                                width: parent.width
                                height: parent.height
                                fillMode: Image.Stretch //拉伸填充
                                source:sw_original_car_eq_enable.checked?"qrc:///image/images/switch-on.png":"qrc:///image/images/switch-off.png"
                            }
                            property bool isUpdateView: false

                            onCheckedChanged: {
                                if (sw_original_car_eq_enable.isUpdateView) {
                                    return;
                                }

                                Ams.setOriginalCarEqEnable(sw_original_car_eq_enable, checked);
                            }

                            function updateView() {
                                isUpdateView = true;
                                checked = Ams.getOriginalCarEqEnable() > 0 ? true : false;
                                isUpdateView = false;
                            }
                        }
                        Text {
                            text:qsTr("开启")
                            anchors.left: sw_original_car_eq_enable.right
                            anchors.leftMargin: 6
                            anchors.verticalCenter: item_original_car_eq_enable_sw.verticalCenter
                            font.bold: settings.fontBold
                            font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                            color:sw_original_car_eq_enable.checked?"#fc7e24":"#93bcef"

                            MouseArea {
                                anchors.fill: parent

                                onClicked: {
                                    sw_original_car_eq_enable.checked = !sw_original_car_eq_enable.checked;
                                }
                            }
                        }
                    }
                }

                Row {
                    id: row_soundfield_balance_enable
                    spacing: (settings.lang == "cn")?8:6
                    anchors.right: parent.right
                    anchors.rightMargin: (settings.lang == "cn") ? 90 : ((settings.lang == "en" || settings.lang == "pt") ? 45 : 40)
                    anchors.top: row_original_car_eq_enable.visible ? row_original_car_eq_enable.bottom : parent.top
                    anchors.topMargin: row_original_car_eq_enable.visible ? 10 : 30
                    Text {
                        id: title_soundfield_balance_enable
                        text:qsTr("声场平衡：")
                        anchors.top: parent.top
                        font.bold: settings.fontBold
                        font.pixelSize: 15 /*(settings.lang == "cn")?18:15*/
                        color:"#93bcef"
                    }
                    Item {
                        id: item_soundfield_balance_enable_sw
                        anchors.verticalCenter: title_soundfield_balance_enable.verticalCenter
                        width: 120
                        height: 17

                        Text {
                            text:qsTr("关闭")
                            anchors.right: sw_soundfield_balance_enable.left
                            anchors.rightMargin: 6
                            anchors.verticalCenter: item_soundfield_balance_enable_sw.verticalCenter
                            font.bold: settings.fontBold
                            font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                            color:sw_soundfield_balance_enable.checked?"#93bcef":"#fc7e24"

                            MouseArea {
                                anchors.fill: parent

                                onClicked: {
                                    sw_soundfield_balance_enable.checked = !sw_soundfield_balance_enable.checked;
                                }
                            }
                        }
                        Switch {
                            id:sw_soundfield_balance_enable
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.horizontalCenterOffset: (settings.lang == "cn")?1:4
                            anchors.top: parent.top;
                            width: 48
                            height: parent.height
                            indicator: Image {
                                width: parent.width
                                height: parent.height
                                fillMode: Image.Stretch //拉伸填充
                                source:sw_soundfield_balance_enable.checked?"qrc:///image/images/switch-on.png":"qrc:///image/images/switch-off.png"
                            }
                            property bool isUpdateView: false

                            onCheckedChanged: {
                                if (sw_soundfield_balance_enable.isUpdateView) {
                                    return;
                                }

                                Ams.setSoundFieldBalanceEnable(sw_soundfield_balance_enable, checked);
                            }

                            function updateView() {
                                isUpdateView = true;
                                checked = Ams.getSoundFieldBalanceEnable() > 0 ? true : false;
                                isUpdateView = false;
                            }
                        }
                        Text {
                            text:qsTr("开启")
                            anchors.left: sw_soundfield_balance_enable.right
                            anchors.leftMargin: 6
                            anchors.verticalCenter: item_soundfield_balance_enable_sw.verticalCenter
                            font.bold: settings.fontBold
                            font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                            color:sw_soundfield_balance_enable.checked?"#fc7e24":"#93bcef"

                            MouseArea {
                                anchors.fill: parent

                                onClicked: {
                                    sw_soundfield_balance_enable.checked = !sw_soundfield_balance_enable.checked;
                                }
                            }
                        }
                    }
                }

                AmsButton4 {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.horizontalCenterOffset: -5
                    anchors.bottom: parent.bottom
//                    anchors.bottomMargin: 5
                    //                icon_src:"qrc:///image/images/reset.png"
                    width: 100
                    txt:qsTr("确认")
                    onClicked: {
                        a2b_params_setting_frm.close();
                    }
                }
            }

            //                DspDialog {
            //                    id: timeout_dig
            //                    x: (root.width-width)/ 2-reset_warning_frm.padding
            //                    y: (root.height-height)/2-reset_warning_frm.padding-16
            //                    onYes: {
            //                        if(confirm_text.text!=""&&confirm_text.text.toLowerCase()=="yes"){
            //                            Ams.devResetConfig(sf);
            //                            confirm_text.text="";
            //                            busyView.modalShow(qsTr("还原中，") + qsTr("请稍候..."));
            //                        }
            //                    }
            //                }

            WinCanCtrlSettings {
                id:can_ctrl_settings_win
                parent: root.contentItem
                x: (root.width-width)/ 2
                y: (root.height-height)/2
            }
        }
        TabBar {
            id: bar_rca_or_amp
            visible: showTabBar && (stacks.currentIndex == 0 || stacks.currentIndex == 1)
            spacing: 6
            anchors.top: work_area.top;
            anchors.topMargin: 4
            anchors.left: work_area.left
            anchors.leftMargin: 4
            property bool isUpdateView: false
            property bool showTabBar: false
            property bool showGroupOfRCA: false
            property bool splitGroupOfAMP: false
            z:1
//            implicitWidth: tb_ar.width
            height: visible?25:0
            background:Rectangle{
                //implicitWidth: parent.width
                implicitHeight: parent.height
                border.width: 0
                color:"transparent"
            }

            onFocusChanged: {
                if (focus) {
                    io.setCurrentOutputOnFocus();
                }
            }

            TabButton {
                visible: bar_rca_or_amp.showGroupOfRCA
                width: visible?130:-6
                height: visible?25:0
                id:tb_rca
                text: visible?bar_rca_or_amp.currentIndex==0?'<font color="#93bcef">'+qsTr("RCA输出")+'</font>':'<font color="#5a646e">'+qsTr("RCA输出")+'</font>':""
                font.pixelSize: 14
                font.bold: true
                background: Rectangle{
                    implicitWidth: parent.width
                    implicitHeight: parent.height
                    border.color:"#485056"
                    border.width: 1
                    gradient: Gradient {
                        GradientStop { position: 0 ; color: bar_rca_or_amp.currentIndex==0?"#314a68":"#0e191e" }
                        GradientStop { position: 1 ; color:bar_rca_or_amp.currentIndex==0?"#0e151e":"#0e191e" }
                    }
                }

                Rectangle{
                    anchors.top: parent.bottom
                    anchors.topMargin: -1
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width - 2
                    height: 1
                    border.color: "transparent"
                    border.width: 1
                    color: bar_rca_or_amp.currentIndex==0?"#0e151e":"#495156"
                }
            }

            TabButton {
                width: visible?130:0
                text:visible?bar_rca_or_amp.currentIndex==1? '<font color="#93bcef">'+qsTr("功放输出")+(tb_amp_2.visible ? ((settings.lang == "cn" ? "" : " ") + "1")/*("1~" + (16 - Ams.getSharedChannelsLength()))*/ : "")+'</font>': '<font color="#5a646e">'+qsTr("功放输出")+(tb_amp_2.visible ? ((settings.lang == "cn" ? "" : " ") + "1")/*("1~" + (16 - Ams.getSharedChannelsLength()))*/ : "")+'</font>':""
                font.pixelSize: 14
                font.bold: true
                id:tb_amp_1
                height: visible?25:0
                background: Rectangle{
                    implicitWidth: parent.width
                    implicitHeight: parent.height
                    border.color:"#485056"
                    border.width: 1
                    gradient: Gradient {
                        GradientStop { position: 0 ; color: bar_rca_or_amp.currentIndex==1?"#314a68":"#0e191e" }
                        GradientStop { position: 1 ; color:bar_rca_or_amp.currentIndex==1?"#0e151e":"#0e191e" }
                    }
                }
                Rectangle{
                    anchors.top: parent.bottom
                    anchors.topMargin: -1
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width - 2
                    height: 1
                    border.color: "transparent"
                    border.width: 1
                    color: bar_rca_or_amp.currentIndex==1?"#0e151e":"#495156"
                }
            }

            TabButton {
                visible: bar_rca_or_amp.splitGroupOfAMP
                width: visible?130:0
                text:visible?bar_rca_or_amp.currentIndex==2? '<font color="#93bcef">'+qsTr("功放输出")+(settings.lang == "cn" ? "" : " ")+"2"/*((16 - Ams.getSharedChannelsLength() + 1) + "~" + Ams.getIndepAmpOutputsLength())*/+'</font>': '<font color="#5a646e">'+qsTr("功放输出")+(settings.lang == "cn" ? "" : " ")+"2"/*((16 - Ams.getSharedChannelsLength() + 1) + "~" + Ams.getIndepAmpOutputsLength())*/+'</font>':""
                font.pixelSize: 14
                font.bold: true
                id:tb_amp_2
                height: visible?25:0
                background: Rectangle{
                    implicitWidth: parent.width
                    implicitHeight: parent.height
                    border.color:"#485056"
                    border.width: 1
                    gradient: Gradient {
                        GradientStop { position: 0 ; color: bar_rca_or_amp.currentIndex==2?"#314a68":"#0e191e" }
                        GradientStop { position: 1 ; color:bar_rca_or_amp.currentIndex==2?"#0e151e":"#0e191e" }
                    }
                }
                Rectangle{
                    anchors.top: parent.bottom
                    anchors.topMargin: -1
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width - 2
                    height: 1
                    border.color: "transparent"
                    border.width: 1
                    color: bar_rca_or_amp.currentIndex==2?"#0e151e":"#495156"
                }
            }

            onCurrentIndexChanged: {
                if (isUpdateView) {
                    return;
                }

                var recoveryCurrentIndex = 0;
                var recoveryCurrentOutput = io.currentOutput;
                switch (Ams.getCurrentOutputsTypeGroup()) {
                case Ams.AMP_OUTPUTS_GROUP_1:
                    recoveryCurrentIndex = 1;
                    break;
                case Ams.AMP_OUTPUTS_GROUP_2:
                    recoveryCurrentIndex = 2;
                    break;
                }

                var desTypeGroup = Ams.UNI_OUTPUTS_GROUP;
                switch (currentIndex) {
                case 1:
                    desTypeGroup = Ams.AMP_OUTPUTS_GROUP_1;
                    break;
                case 2:
                    desTypeGroup = Ams.AMP_OUTPUTS_GROUP_2;
                    break;
                }
                Ams.setCurrentOutputsTypeGroup(desTypeGroup);

                if (Ams.isAmplifierChannelMuteExist() && (Ams.getUniversalOutputsLength() == 0 || currentIndex > 0) && Ams.isAnyAmplifierChannelMute()) {
                    toast.show(qsTr("部分功放输出通道未开启，请按需开启。"));
                }

                configDsp(true);
                Ams.checkRepairCurrentMaster();
                if (io.currentOutput >= Ams.getOutputsLength()) { //输出下标超出当前设备最大输出下标的情况
                    io.currentOutput = recoveryCurrentOutput = Ams.getOutputsLength() - 1;
                }
                //console.log("onCurrentIndexChanged: io.currentOutput = " + io.currentOutput + ", recoveryCurrentOutput = " + recoveryCurrentOutput);
                io.updateView();
                out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                row_check.updateAlias();
                row_check.updateCheck(io.currentOutput);
                rep_outgrp.updateViewOfHalfChecked();
                if (channel_vol.visible) {
                    updChanle(); //更新通道音量标签上显示的通道
                    channel_vol.updateView();
                }
                //row_check.updateLocalUI();
                //btn_bridge_joint_ij.updateView();
                //btn_bridge_joint_kl.updateView();
                if (stacks.currentIndex == 0) { //在“输入输出”界面的特殊处理
                    rep_outgrp.itemAt(io.currentOutput).label_checked = true; //避免在所有输出通道都未配置输入源的情况下，刷新界面后不高亮显示当前选中输出通道的问题
                    rep_outgrp.itemAt(io.currentOutput).focus = true;
                } else if (stacks.currentIndex == 1) { //在“处理”界面的特殊处理
                    //要确保至少有一组有效io存在，并将主通道设置到第一个发现的通道的组主上面。
                    var seq = Ams.getOutputsLength();
                    if (Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput))) {
                        seq = io.currentOutput;
                    } else {
                        for(var i=0;i<Ams.getOutputsLength();i++)
                        {
                            if(Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i))) {
                                seq = Ams.getOutputViewIdxByCmdLineIdx(Ams.getOutputGroup(Ams.getOutputCmdLineIdxByViewIdx(i))); //将主通道设置到第一个发现的通道的组主上面
                                break;
                            }
                        }
                    }
                    if(seq == Ams.getOutputsLength()){
                        io.currentOutput = recoveryCurrentOutput;
                        updateView(recoveryCurrentIndex);
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                        row_check.updateAlias();
                        row_check.updateCheck(io.currentOutput);
                        rep_outgrp.updateViewOfHalfChecked();
                        if (channel_vol.visible) {
                            updChanle(); //更新通道音量标签上显示的通道
                            channel_vol.updateView();
                        }
                        //row_check.updateLocalUI();
                        rep_outgrp.itemAt(io.currentOutput).label_checked = true; //避免在所有输出通道都未配置输入源的情况下，刷新界面后不高亮显示当前选中输出通道的问题
                        rep_outgrp.itemAt(io.currentOutput).focus = true;
                        //btn_bridge_joint_ij.updateView();
                        //btn_bridge_joint_kl.updateView();
                        toast.show(qsTr("通道还没有配置，请到“输入输出”界面至少先配置一个通道。"));
                    } else {
                        //console.log("io.currentOutput: " + io.currentOutput);
                        io.currentOutput = seq;
                        Ams.setCurrentOutputMaster(Ams.getOutputCmdLineIdxByViewIdx(seq), true);
                        dsp_frame.masterChanged(); //总是假定io调整了当前master
                    }
                }
            }
            function updateView(index) {
                isUpdateView = true;
                currentIndex = index;

                var desTypeGroup = Ams.UNI_OUTPUTS_GROUP;
                switch (currentIndex) {
                case 1:
                    desTypeGroup = Ams.AMP_OUTPUTS_GROUP_1;
                    break;
                case 2:
                    desTypeGroup = Ams.AMP_OUTPUTS_GROUP_2;
                    break;
                }
                Ams.setCurrentOutputsTypeGroup(desTypeGroup);

                configDsp(true);
                Ams.checkRepairCurrentMaster();
                if (io.currentOutput >= Ams.getOutputsLength()) { //输出下标超出当前设备最大输出下标的情况
                    io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                }
                io.updateView();
                isUpdateView = false;
            }
        }
        TabBar {
            id: bar_routings
            visible: isDARoutingMixed && stacks.currentIndex == 0
            spacing: tb_dr.visible?6:0
            anchors.top: work_area.top;
            anchors.topMargin: 4
            anchors.left: work_area.left
            anchors.leftMargin: 4
            property bool isUpdateView: false
            property bool isHasDigitalRoute: false
            property bool isDARoutingMixed: false
            z:1
//            implicitWidth: tb_ar.width
            implicitHeight: tb_ar.height
            background:Rectangle{
                //implicitWidth: parent.width
                implicitHeight: parent.height
                border.width: 0
                color:"transparent"
            }

            Component.onCompleted: {
//                console.log("bar_routings.Component.onCompleted: currentIndex = " + currentIndex);
                if (Ams.isDARoutingMixed()) {
                    switch (currentIndex) {
                    case 0:
                    case 1:
                        io.currentSrcRouting = Ams.DAMIXED;
                        break;
                    case 2:
                        io.currentSrcRouting = Ams.BLUETOOTH;
                        break;
                    }
                } else {
                    io.currentSrcRouting = null;
                }
            }

            onIsDARoutingMixedChanged: {
                bar_routings.currentIndexChanged(); //强行触发刷新
            }

            onFocusChanged: {
                if (focus) {
                    io.setCurrentOutputOnFocus();
                }
            }

            TabButton {
                width: visible?130:0
                height: visible?25:0
                id:tb_dr
                text: visible?bar_routings.currentIndex==0?'<font color="#93bcef">'+qsTr("数字路由")+'</font>':'<font color="#5a646e">'+qsTr("数字路由")+'</font>':""
                font.pixelSize: 14
                font.bold: true
                background: Rectangle{
                    implicitWidth: parent.width
                    implicitHeight: parent.height
                    border.color:"#485056"
                    border.width: 1
                    gradient: Gradient {
                        GradientStop { position: 0 ; color: bar_routings.currentIndex==0?"#314a68":"#0e191e" }
                        GradientStop { position: 1 ; color:bar_routings.currentIndex==0?"#0e151e":"#0e191e" }
                    }
                }

                Rectangle{
                    anchors.top: parent.bottom
                    anchors.topMargin: -1
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width - 2
                    height: 1
                    border.color: "transparent"
                    border.width: 1
                    color: bar_routings.currentIndex==0?"#0e151e":"#495156"
                }
            }
            TabButton {
                width: visible?130:0
                text:visible?bar_routings.currentIndex==1? '<font color="#93bcef">'+((bar_routings.isDARoutingMixed && bar_routings.isHasDigitalRoute) ? qsTr("数字/模拟路由") : qsTr("模拟路由"))+'</font>': '<font color="#5a646e">'+((bar_routings.isDARoutingMixed && bar_routings.isHasDigitalRoute) ? qsTr("数字/模拟路由") : qsTr("模拟路由"))+'</font>':""
                font.pixelSize: 14
                font.bold: true
                id:tb_ar
                height: visible?25:0
                background: Rectangle{
                    implicitWidth: parent.width
                    implicitHeight: parent.height
                    border.color:"#485056"
                    border.width: 1
                    gradient: Gradient {
                        GradientStop { position: 0 ; color: bar_routings.currentIndex==1?"#314a68":"#0e191e" }
                        GradientStop { position: 1 ; color:bar_routings.currentIndex==1?"#0e151e":"#0e191e" }
                    }
                }
                Rectangle{
                    anchors.top: parent.bottom
                    anchors.topMargin: -1
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width - 2
                    height: 1
                    border.color: "transparent"
                    border.width: 1
                    color: bar_routings.currentIndex==1?"#0e151e":"#495156"
                }
            }
            TabButton {
                width: visible?130:0
                height: visible?25:0
                id:tb_br
                text: visible?bar_routings.currentIndex==2?'<font color="#93bcef">'+qsTr("蓝牙路由")+'</font>':'<font color="#5a646e">'+qsTr("蓝牙路由")+'</font>':""
                font.pixelSize: 14
                font.bold: true
                background: Rectangle{
                    implicitWidth: parent.width
                    implicitHeight: parent.height
                    border.color:"#485056"
                    border.width: 1
                    gradient: Gradient {
                        GradientStop { position: 0 ; color: bar_routings.currentIndex==2?"#314a68":"#0e191e" }
                        GradientStop { position: 1 ; color:bar_routings.currentIndex==2?"#0e151e":"#0e191e" }
                    }
                }

                Rectangle{
                    anchors.top: parent.bottom
                    anchors.topMargin: -1
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width - 2
                    height: 1
                    border.color: "transparent"
                    border.width: 1
                    color: bar_routings.currentIndex==2?"#0e151e":"#495156"
                }
            }
            onCurrentIndexChanged: {
                if (isUpdateView) {
                    return;
                }

                if (Ams.isDARoutingMixed()) {
                    switch (currentIndex) {
                    case 0:
                    case 1:
                        io.currentSrcRouting = Ams.DAMIXED;
                        break;
                    case 2:
                        io.currentSrcRouting = Ams.BLUETOOTH;
                        break;
                    }
                } else {
                    io.currentSrcRouting = null;
                }

                io.updateView();
                Ams.setCurrentRouting(currentIndex);
                out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                row_check.updateAlias();
                row_check.updateCheck(io.currentOutput);
                if (stacks.currentIndex == 1) { //在“处理”界面的特殊处理
                    //要确保至少有一组有效io存在，并将主通道设置到第一个发现的通道的组主上面。
                    var seq = Ams.getOutputsLength();
                    if (Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput))) {
                        seq = io.currentOutput;
                    } else {
                        console.log("Ams.getOutputsLength():"+Ams.getOutputsLength());
                        for(var i=0;i<Ams.getOutputsLength();i++)
                        {
                            if(Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i))) {
                                seq = Ams.getOutputGroup(Ams.getOutputCmdLineIdxByViewIdx(i)); //将主通道设置到第一个发现的通道的组主上面
                                break;
                            }
                        }
                    }
                    if(seq == Ams.getOutputsLength()){
                        var recoveryIdx;
                        if (currentIndex == Ams.DIGITAL) {
                            recoveryIdx = Ams.ANALOG;
                        } else {
                            recoveryIdx = Ams.DIGITAL;
                        }
                        bar_routings.updateView(recoveryIdx);
                        io.updateView();
                        Ams.setCurrentRouting(recoveryIdx);
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                        row_check.updateAlias();
                        row_check.updateCheck(io.currentOutput);
                        toast.show(qsTr("通道还没有配置，请到“输入输出”界面至少先配置一个通道。"));
                    } else {
                        //console.log("io.currentOutput: " + io.currentOutput);
                        io.currentOutput = seq;
                        Ams.setCurrentOutputMaster(Ams.getOutputCmdLineIdxByViewIdx(seq), true);
                        dsp_frame.masterChanged(); //总是假定io调整了当前master
                    }
                }
            }
            function updateView(index) {
                isUpdateView = true;
                currentIndex = index;
                //io.updateView();
                isUpdateView = false;
            }
        }
        //画中间左边区域，不包括输出别名设置区域
        Rectangle{
            visible: !root.isSetting && stacks.currentIndex != 4
            id:sub_area_frame
            anchors.left: bar_rca_or_amp.visible ? bar_rca_or_amp.left : bar_routings.left
            anchors.top: bar_rca_or_amp.visible ? bar_rca_or_amp.bottom : bar_routings.bottom
            anchors.topMargin: -1
            anchors.right: parent.right
            anchors.rightMargin:  widthAmsAlias
            anchors.bottom: parent.bottom
            border.color: "#495156"
            border.width: 1
            gradient: Gradient {
                GradientStop { position: 0.0; color: "#010406" }
                GradientStop { position: 1.0; color: "#1e3142" }
            }//color: "transparent"
        }
        Rectangle{
            visible: !root.isSetting && stacks.currentIndex != 4
            id:sub_area
            anchors.left: bar_rca_or_amp.visible ? bar_rca_or_amp.left : bar_routings.left
            anchors.top: bar_rca_or_amp.visible ? bar_rca_or_amp.bottom : bar_routings.bottom
//            anchors.topMargin: -1
            anchors.topMargin: 0
            anchors.right: parent.right
            anchors.bottom: parent.bottom
//            border.color: "#495156"
//            border.width: 1
//            gradient: Gradient {
//                GradientStop { position: 0.0; color: "#010406" }
//                GradientStop { position: 1.0; color: "#1e3142" }
//            }
            color: "transparent"
//            width: 1166
//            height:568 - (bar_rca_or_amp.visible || bar_routings.visible?25:0)
            Row {//通道名栏
                anchors.top: parent.top
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.horizontalCenterOffset: -widthAmsAlias/2 //133为 AmsAlias的宽度
//                anchors.topMargin: 15
                anchors.topMargin: 0
                spacing: 6
                //spacing:Ams.getOutputsLength()==16? 7:(Ams.getOutputsLength()==8?15:(Ams.getOutputsLength()==6?20:25))
//                spacing: Ams.getOutputsLength()==16? 7:(1166-1*(Ams.getOutputsLength())-25)/Ams.getOutputsLength()
                id:row_check
//                Component.onCompleted: {
//                    console.log("Row Row completed");
//                }

                function updateAlias() {
                    for(var i=0;i<Ams.getOutputsLength();i++) {
                        var it=rep_outgrp.itemAt(i);
                        it.aliasName = root.getOutputAliasName(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(i)));
                        it.name = root.getRemapedOutputName(i);
                    }
                }
                function updateCheck(curIdx) {
                    if(rep_outgrp.count<Ams.getOutputsLength()){
                        return
                    }

                    /* 为可能的被桥接通道获取组 */
                    var grp= Ams.getOutputGroup(Ams.getOutputCmdLineIdxByViewIdx(curIdx));
                    var pairedCh = Ams.getPairedBridgeJointChannel(Ams.getOutputCmdLineIdxByViewIdx(curIdx));
                    if (pairedCh > -1) {
                        if (!(pairedCh % 2)) { //curIdx为被桥接通道时，以桥接主通道分组为其分组(桥接主通道为偶数下标，如8、10)
                            grp = Ams.getOutputGroup(pairedCh);
                        }
                    }

                    for (var i = 0; i < Ams.getOutputsLength(); i++) {
                        var it = rep_outgrp.itemAt(i);
                        var iGrp;
                        //console.log("i="+i+"ite="+it+",,updateCheck---->curIdx="+curIdx+",grp="+grp+","+Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i))+",group="+Ams.getGroup(Ams.getOutputCmdLineIdxByViewIdx(curIdx))+",ousize="+Ams.getOutputsLength())

                        pairedCh = Ams.getPairedBridgeJointChannel(Ams.getOutputCmdLineIdxByViewIdx(i));
                        if (pairedCh > -1 && !(pairedCh % 2)) { //i为被桥接通道时，以桥接主通道分组为其分组(桥接主通道为偶数下标，如8、10)
                            iGrp = Ams.getOutputGroup(pairedCh);
                        } else {
                            iGrp = Ams.getOutputGroup(Ams.getOutputCmdLineIdxByViewIdx(i));
                        }

                        if ((grp === iGrp) && (Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i)))) {
                            if (it.box_checked != true) {
                                it.outer_event=true;  //让checkbox知道这是虚拟触发，不要去更新组
                                it.box_checked = true;

//                                var pairedCh = Ams.getPairedBridgeJointChannel(Ams.getOutputCmdLineIdxByViewIdx(i));
//                                if (pairedCh > -1) {
//                                    it = rep_outgrp.itemAt(pairedCh);
//                                    it.outer_event=true;  //让checkbox知道这是虚拟触发，不要去更新组
//                                    it.box_checked = true;
//                                }
                            }
                        } else {
                            if(it.box_checked != false) {
                                it.outer_event = true;  //让checkbox知道这是虚拟触发，不要去更新组
                                it.box_checked = false;
                            }
                        }
                        if (!Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i))) { //无输入源的通道全部不显示图形
                            Ams.setGraphDisplay(Ams.getOutputCmdLineIdxByViewIdx(i), 0);
                        }
                    }
                }
                function updateLocalUI()
                {
                    var master = Ams.getCurrentMaster();
                    var master_grp=master;
                    //console.log("master group:"+master_grp);

                    /* 为可能的被桥接通道获取组 */
                    var pairedCh = Ams.getPairedBridgeJointChannel(master_grp);
                    if (pairedCh > -1) {
                        if (!(pairedCh % 2)) { //curIdx为被桥接通道时，以桥接主通道分组为其分组(桥接主通道为偶数下标，如8、10)
                            master_grp = Ams.getOutputGroup(pairedCh);
                        }
                    }

                    for(var i=0;i<Ams.getOutputsLength();i++)
                    {
                        var it=rep_outgrp.itemAt(i);
                        var grp;

                        pairedCh = Ams.getPairedBridgeJointChannel(Ams.getOutputCmdLineIdxByViewIdx(i));
                        if (pairedCh > -1 && !(pairedCh % 2)) { //i为被桥接通道时，以桥接主通道分组为其分组(桥接主通道为偶数下标，如8、10)
                            grp = Ams.getOutputGroup(pairedCh);
                        } else {
                            grp = Ams.getOutputGroup(Ams.getOutputCmdLineIdxByViewIdx(i));
                        }

                        if((grp===master_grp)&&(Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(i))))
                        {
//                            console.log("box enabled:"+i+"grp:"+grp);
                            if (it.box_checked != true) {
                                it.outer_event=true;  //让checkbox知道这是虚拟触发，不要去更新组
                                it.box_checked=true;
                            }
                            it.label_checked = (master === Ams.getOutputCmdLineIdxByViewIdx(i) ? true : false);
                        }
                        else
                        {
                            //console.log("deselect:"+i);
                            if(it.box_checked!=false)
                            {
                                it.outer_event=true;  //让checkbox知道这是虚拟触发，不要去更新组
                                it.box_checked=false;
                            }
                            it.label_checked=false;
                        }

                        it.aliasName = root.getOutputAliasName(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(i)));
                        it.name = root.getRemapedOutputName(i);
                    }
                }
//                Component.onCompleted: {
//                    if (!Ams.isDebug && !Ams.isDemoMode()) return;

//                    updateLocalUI();
//                }
                ButtonGroup {
                    id: grp_outgrp
                }
                Repeater{
                    id:rep_outgrp
                    model: Ams.DspCfgData.length/* + Ams.DspCfgDataExtend.length*/
                    property int boxWidth: 66
                    property bool isReady: false

                    Component.onCompleted: {
                        isReady = true;
                    }

                    function updIdx(idx,isEnable,isVisible){
                        rep_outgrp.itemAt(idx).enabled=isEnable;
                        rep_outgrp.itemAt(idx).isVisible=isVisible;
                    }

                    /*
                    先保存组成员，然后将自己切换为leader并把旧成员接管到自己手下。
                    这个函数只在label被选中时候会调用.
                    */
                    function switchMaster(idx)
                    {
                        //var i=Ams.getCurrentMaster();
//                        var grp=Ams.getGroup(idx);
                        //console.log("current master:"+Ams.getCurrentMaster()+"target master:"+Ams.getOutputCmdLineIdxByViewIdx(idx)+"idx:"+idx);
                        if(Ams.setCurrentOutputMaster(idx, true))return 1;
                        Ams.setGraphDisplay(idx,1); //master must be display
//                        parent.updateLocalUI();
                        dsp_frame.masterChanged();
                        return 0;
                    }

                    function closeAllAliasMenu(excludeIdx) {
                        for (var i = 0; i < rep_outgrp.count; i++) {
                            if (excludeIdx == null || excludeIdx != i) {
                                rep_outgrp.itemAt(i).closeAliasMenu();
                            }
                        }
                    }

                    /* 更新所有可见输出的增益检测值，报文中的输出排序为：RCA + 功放 */
                    function updateViewOfMeter(allDataList) {
                        //console.log("Out -- allDataList:" + JSON.stringify(allDataList));
                        for (var i = 0; i < Ams.getOutputsLength(); i++) {
                            rep_outgrp.itemAt(i).meterValue = parseFloat(allDataList[Ams.getOutputCmdLineIdxByViewIdx(i)]);
                        }
                    }

                    function updateViewOfHalfChecked() {
                        var master = Ams.getCurrentMaster();
                        var grpMembers = [];
                        var channelList = [];

                        if (Ams.getFiltersCorrelationMode() != "non") {
                            if (Ams.getEqCorrMode() != "non") {
                                grpMembers = Ams.getGroupMembers(Ams.getGroup(master));
                            }
                            channelList.push.apply(channelList, Ams.getFiltersCorrelationChannelList(master, grpMembers, true));
                            channelList.push.apply(channelList, Ams.getFiltersCorrelationChannelList(master, grpMembers, false));
                        }
                        var i;
                        for (i = 0; i < Ams.getOutputsLength(); i++) {
                            if (Ams.getFiltersCorrelationMode() != "non" && channelList.some(function(item) { return item == Ams.getOutputCmdLineIdxByViewIdx(i); })) {
                                rep_outgrp.itemAt(i).box_half_checked = true;
                            } else {
                                rep_outgrp.itemAt(i).box_half_checked = false;
                            }
                        }
                        for (; i < rep_outgrp.model; i++) {
                            rep_outgrp.itemAt(i).box_half_checked = false;
                        }
                    }

                    DspCheckBox{
                        visible: isVisible && stacks.currentIndex < 2
                        width: rep_outgrp.boxWidth
                        //w: Ams.getOutputsLength()==16? 65:(Ams.getOutputsLength()==8?80:(Ams.getOutputsLength()==6?75:80))
                        //w:Ams.getOutputsLength()==16? 65:(1166-15*(Ams.getOutputsLength()-1)-25)/Ams.getOutputsLength()
                        name:root.getOutputName(Ams.getDSPId(/*Ams.getOutputCmdLineIdxByViewIdx*/(index)));//Ams.DspCfgData[index].labels.name;
                        aliasName: root.getOutputAliasName(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(index)));
                        color: enabled?Ams.getOutputColor(/*Ams.getOutputCmdLineIdxByViewIdx*/(index)):Ams.disableColor();
                        hasMeter: io.hasMeter
                        meterEnabled: !io.isDspBypass
                        exclusiveGroup: grp_outgrp
                        property bool isVisible: true

                        Keys.onTabPressed: {

                        }

                        onHasFocus: {
                            io.setCurrentOutputOnFocus();
                        }

                        onLeftKeyPrd: {
                            if (index > 0) {
                                rep_outgrp.itemAt(index - 1).label_checked = true;
                                rep_outgrp.itemAt(index - 1).focus = true;
                            }
                        }

                        onRightKeyPrd: {
                            if (index < Ams.getOutputsLength() - 1) {
                                rep_outgrp.itemAt(index + 1).label_checked = true;
                                rep_outgrp.itemAt(index + 1).focus = true;
                            }
                        }

                        onAliasMenuOpened: {
                            rep_outgrp.closeAllAliasMenu(index);
                        }

                        onAliasChanged: {
                            console.log("onAliasChanged parm: " + index + ", " + aliasIdx);
                            if (Ams.isOutputChAliasInUse(index, aliasIdx)) {
                                msgbox_used.aliasIndexHandler(index, aliasIdx);
                            } else {
                                msgbox_load.aliasIndexHandler(index, aliasIdx);
                            }
                        }

                        onBox_checkedChanged: {
                            //console.log("onBox_checkedChanged: " + Ams.getOutputCmdLineIdxByViewIdx(index) + ": " + box_checked + ", outer_event = " + outer_event);
                            //console.log("io.currentOutput:" + io.currentOutput);
                            if(outer_event){outer_event=false;return;}//
                            if (!Ams.isCorrelationMode()) {
                                if (box_checked != false) {
                                    outer_event = true;
                                    box_checked = false;
                                }
                                if (label_checked) {
                                    label_checkedChanged(label_checked); //强制发射label_checked变化信号
                                } else {
                                    label_checked = true;
                                }
                                console.log("isn't correlation mode");
                                return;
                            }
                            if(!Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(index))) //没有任何输入源
                            {
                                if(box_checked){
                                    //                           msgbox.visible=true;
                                    if (stacks.currentIndex == 0) {
                                        toast.show(qsTr("通道还没有配置，请先配置该通道。"));
                                    } else {
                                        toast.show(qsTr("通道还没有配置，请到“输入输出”界面配置该通道。"));
                                    }
                                    box_checked=false;
                                }
                                return;
                            }
                            if (box_checked && Ams.getCurOutputRoutingCfgData(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)).shift_freq.length !== Ams.getCurOutputRoutingCfgData(Ams.getOutputCmdLineIdxByViewIdx(index)).shift_freq.length) {
                                //                           msgbox.visible=true;
                                toast.show(qsTr("通道EQ段数不同，不允许联调！"));
                                box_checked=false;
                                return;
                            }

                            var pairedCh = Ams.getPairedBridgeJointChannel(Ams.getOutputCmdLineIdxByViewIdx(index));
                            var viewIdx = Ams.getViewIdxByCmdLineIdx(pairedCh);

                            //排除没有主组显示的情况
                            var operableIndex = stacks.currentIndex > 0 ? Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()) : io.currentOutput;
                            var it=rep_outgrp.itemAt(operableIndex);
                            if(it.label_checked==false)
                            {
                                label_checked=true;

                                if (stacks.currentIndex > 0) { //在“处理”界面的处理
                                    //主组变化要通知graph调整显示
                                    grahp_frame.updateLocalUI();
                                }
                            }
                            if(index == operableIndex || viewIdx == operableIndex)
                            {
                                // console.log("change box_checked to true");
                                box_checked=true;
                                return;//如果自己为组头目，则不能变为deselect
                            }

                            if(!label_checked)//这个很重要，label的点击会同时触发box_check，这种情况不能调整到其他组
                            {
                                if (pairedCh > -1) {
                                    if (index % 2) { //将信号交给桥接主通道处理
                                        if (rep_outgrp.itemAt(viewIdx).box_checked == box_checked) {
                                            rep_outgrp.itemAt(viewIdx).box_checkedChanged(); //强行发送改变信号
                                        } else {
                                            rep_outgrp.itemAt(viewIdx).box_checked = box_checked;
                                        }
                                        return;
                                    } else { //保持桥接从通道勾选框状态一致
                                        rep_outgrp.itemAt(viewIdx).outer_event = true;
                                        if (rep_outgrp.itemAt(viewIdx).box_checked == box_checked) {
                                            rep_outgrp.itemAt(viewIdx).box_checkedChanged(); //强行发送改变信号
                                        } else {
                                            rep_outgrp.itemAt(viewIdx).box_checked = box_checked; //将信号交给桥接主通道处理
                                        }
                                    }
                                }

                                if(box_checked)
                                {
                                    var grp_master = Ams.getOutputCmdLineIdxByViewIdx(operableIndex);
                                    pairedCh = Ams.getPairedBridgeJointChannel(grp_master);
                                    if (pairedCh > -1 && !(pairedCh % 2)) {
                                        grp_master = pairedCh;
                                    }
                                    Ams.addGroup(Ams.getOutputCmdLineIdxByViewIdx(index), grp_master);
                                }
                                else {//uncheck 可能来自客户点击（需要迁移组）或来自于js要求隐藏显示，来自js的不能去复位组。
                                    if(!outer_event)
                                    {
                                        var resetIndex = Ams.getOutputCmdLineIdxByViewIdx(index);
                                        if (pairedCh > -1 && !(pairedCh % 2)) {
                                            resetIndex = pairedCh;
                                        }

                                        Ams.resetGroup(resetIndex);
                                    }
                                }//不为leader则调整归属组
                            }
                            rep_outgrp.updateViewOfHalfChecked();
                        }

                        onLabel_checkedChanged: {
                            if (!label_checked) return;
                            //console.log("1 -- Ams.DspCfgData = " + JSON.stringify(Ams.DspCfgData).substring(0, 30000));
                            //console.log("2 -- Ams.DspCfgData = " + JSON.stringify(Ams.DspCfgData).substring(30000));
                            //console.log("1 -- Ams.DspCfgDataExtend = " + JSON.stringify(Ams.DspCfgDataExtend).substring(0, 30000));
                            //console.log("2 -- Ams.DspCfgDataExtend = " + JSON.stringify(Ams.DspCfgDataExtend).substring(30000));
                            //console.log("1 -- Ams.DspCfgDataExtend_32_TO_47 = " + JSON.stringify(Ams.DspCfgDataExtend_32_TO_47).substring(0, 30000));
                            //console.log("2 -- Ams.DspCfgDataExtend_32_TO_47 = " + JSON.stringify(Ams.DspCfgDataExtend_32_TO_47).substring(30000));
                            //console.log("Ams.getOutputCmdLineIdxByViewIdx("+index+") = " + Ams.getOutputCmdLineIdxByViewIdx(index));
                            //console.log("label grp:"+Ams.getGroup(Ams.getOutputCmdLineIdxByViewIdx(index)));
                            if (stacks.currentIndex == 0) { //在“输入输出”界面的处理
                                if (!Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput))) {
                                    Ams.resetGroup(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)); //如果通道切走前没有选中任何输入源，则重置其分组
                                }
                                io.currentOutput = index; //同步切换“信号”界面的当前选中索引
                                Ams.setCurrentOutputMaster(Ams.getOutputCmdLineIdxByViewIdx(index), Ams.getGraphDisplay(Ams.getOutputCmdLineIdxByViewIdx(index)));
                                io.updateView();
                                out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                                row_check.updateCheck(index);
                                rep_outgrp.updateViewOfHalfChecked();
                                if (channel_vol.visible) {
                                    updChanle(); //更新通道音量标签上显示的通道
                                    channel_vol.updateView();
                                }
                            } else {
                                var desIdx = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                                if (desIdx > Ams.getOutputsLength()) {
                                    desIdx = Ams.getOutputsLength() - 1;
                                }
                                io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(desIdx); //先切换“信号”界面的当前选中索引到当前主
                                if(!Ams.isOutputRoutingEnabled(Ams.getOutputCmdLineIdxByViewIdx(index)))
                                {
//                                    if(label_checked){
                                        //                            msgbox.visible=true;
                                        toast.show(qsTr("通道还没有配置，请到“输入输出”界面配置该通道。"));
                                        label_checked=false;
                                        row_check.updateLocalUI();
//                                    }
//                                    return;
                                }
//                                if(label_checked)
//                                {
                                    if(Ams.getCurrentMaster()==Ams.getOutputCmdLineIdxByViewIdx(index)) {
                                        if (!box_checked) { //避免用户unchecked主
                                            outer_event = true;
                                            box_checked = true;
                                        }
                                        return;
                                    }
                                    if(rep_outgrp.switchMaster(Ams.getOutputCmdLineIdxByViewIdx(index)))
                                    {
                                        //通道没有配置
                                        //                            msgbox.visible=true;
                                        toast.show(qsTr("通道还没有配置，请到“输入输出”界面配置该通道。"));
                                        label_checked=false;
                                        box_checked=false;
                                        return;
                                    }
                                    updChanle(); //更新通道音量标签上显示的通道
//                                }
//                                else//两种情况进入unchecked,1 客户点击 2 其他控件请求unchecked
//                                {
//                                    //用户点击的是当前master就是自己(其他控件都必须先调整自己为master后才允许发送deselect)，显然不能一个master都没有，所以会强制保持当前master状态。
//                                    if(Ams.getCurrentMaster()==Ams.getOutputCmdLineIdxByViewIdx(index)) //自己是主，不能uncheck
//                                    {
//                                        label_checked=true;
//                                        return;
//                                    }
//                                    //否则按照是其他控件发出请求处理，直接deselect，同时调整自己的组号
//                                    else{
//                                        grahp_frame.updateLocalUI();
//                                    }
//                                }
                                io.currentOutput = index; //处理结束后同步切换“信号”界面的当前选中索引
                            }
                        }
                    }

                }

                DspMessageDialog {
                    id:msgbox_used
                    title: qsTr("通道别名配置")
                    icon: StandardIcon.Warning
                    text: qsTr("别名“") + root.getOutputAliasName(pvtAliasIndex) + qsTr("”已被使用，仍然使用于当前通道？")
                    standardButtons: StandardButton.Yes | StandardButton.No
                    property int pvtOutputSeq: 0
                    property int pvtAliasIndex: 0
                    onYes: {
                        msgbox_load.aliasIndexHandler(pvtOutputSeq, pvtAliasIndex);
                    }
                    onNo: {
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true); //恢复显示数据库值
                    }
                    onRejected: {
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true); //恢复显示数据库值
                    }
                    function aliasIndexHandler(seq, index) {
                        pvtOutputSeq = seq;
                        pvtAliasIndex = index;
                        msgbox_used.visible = true;
                    }
                }

                DspMessageDialog {
                    id:msgbox_load
                    title: qsTr("通道别名配置")
                    icon: StandardIcon.Question
                    text: qsTr("是否加载别名“") + root.getOutputAliasName(pvtAliasIndex) + qsTr("”的滤波器预置值？")
                    standardButtons: StandardButton.Yes | StandardButton.No
                    property int pvtOutputSeq: 0
                    property int pvtAliasIndex: 0
                    onYes: {
                        var ch = Ams.getOutputCmdLineIdxByViewIdx(pvtOutputSeq);
                        var pass_band = Ams.loadOutputAliasFilter(ch, root.getOutputAliasPassband(pvtAliasIndex));//加载输出通道别名对应滤波器配置
                        Ams.setFilter(msgbox_load, ch, false, true, pass_band.high.bypass, pass_band.high.type, pass_band.high.slope, pass_band.high.freq);
                        Ams.setFilter(msgbox_load, ch, false, false, pass_band.low.bypass, pass_band.low.type, pass_band.low.slope, pass_band.low.freq);
                        if (Ams.isHasAllpassModule()) {
                            if (pass_band.high.bypass && Ams.getHighFilterAllpassEnable(ch)) {
                                Ams.setHighFilterAllpassEnable(msgbox_load, ch, false, false, false);
                            }
                            if (pass_band.low.bypass && Ams.getLowFilterAllpassEnable(ch)) {
                                Ams.setLowFilterAllpassEnable(msgbox_load, ch, false, false, false);
                            }
                        }
                        if (Ams.checkRepairArbitraryPhaseEnable(msgbox_load, ch, false)) {
                            toast.show(qsTr("已关闭任意相位调节！"));
                        }
                        grahp_frame.refreshArbitraryPhaseValid();
                        grahp_frame.updateLocalUI();
                    }
                    onNo: {
                        channel_vol.updateView();
                    }
                    onRejected: {
                        channel_vol.updateView();
                    }
                    function aliasIndexHandler(seq, idx) {
                        Ams.setOutputChAlias(msgbox_load, Ams.getOutputCmdLineIdxByViewIdx(seq), idx); //设置输出通道别名
                        row_check.updateAlias();
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                        rep_outgrp.updateViewOfHalfChecked();
                        if (idx > 0) { //仅有指定别名的情况下需要显示弹窗
                            pvtOutputSeq = seq;
                            pvtAliasIndex = idx;
                            msgbox_load.visible = true;
                        } else {
                            channel_vol.updateView();
                        }
                    }
                }
            }

            StackLayout {
                id:stacks
                currentIndex:manu_bar_buttons.current_selected
                anchors.top: row_check.bottom
//                anchors.topMargin: io.hasMeter ? 24 : 12
                anchors.topMargin: 0
                anchors.left: sub_area.left
                anchors.leftMargin: 5
                anchors.right: parent.right
                anchors.bottom: parent.bottom
//                width: 1156
//                height: io.hasMeter ? 474 : 486 //436
                onCurrentIndexChanged: {
                    if (currentIndex == 0) { //“输入输出”界面
                        if (Ams.isHasDspBypassModule() && !Ams.isVSRxSeriesDevice()) {
                            channel_vol.visible = true;
                        } else {
                            channel_vol.visible = false;
                        }
                        comboBox_dts_out_type_RV.isEnable = (Ams.isHasKaraokeRoute() ? (Ams.getKaraokeMode() < 1) : true);
                        comboBox_dts_out_type_RV.updateView(); //无论什么型号都要刷新这个控制的状态以使界面产生正确的变化
                        sw_dts.updateView(); //无论什么型号都要刷新这个控制的状态以使界面产生正确的变化
                        sw_hdmi.updateView(); //无论什么型号都要刷新这个控制的状态以使界面产生正确的变化
                        col_dts_opts.isHasDts = (Ams.isHasDtsModule() && !Ams.isVSRxSeriesDevice());
                        col_dts_opts_RV.isHasDts = Ams.isVSRxSeriesDevice();
                        if (col_dts_opts.isHasDts) {
                            sw_dts_input_type.updateView();
                        }
                        if (col_dts_opts_RV.isHasDts) {
                            col_dts_opts_RV.isHasHdmiSwitch = Ams.isHasHdmiPlayStateSwitch();
                            col_dts_opts_RV.setOutTypeModel(col_dts_opts_RV.isHasHdmiSwitch);
                            col_dts_opts_RV.isHasSurround = Ams.isHasDtsModule();
                        }
                        comboBox_dsd_out_type_RV.isEnable = (Ams.isHasKaraokeRoute() ? (Ams.getKaraokeMode() < 1) : true);
                        comboBox_dsd_out_type_RV.updateView(); //无论什么型号都要刷新这个控制的状态以使界面产生正确的变化
                        rec_signal_detection.enabled = Ams.isHasRemixModeOptions();
                        rec_karaoke_settings.enabled = Ams.isHasKaraokeRoute();
                        btn_a2b_params_setting.enabled = (Ams.isOriginalCarEqExist() || Ams.isSoundFieldBalanceExist());
                        btn_input_eq.enabled = Ams.isInputEQExist() && !Ams.isForFactoryTest();
                        btn_amp_on_off.enabled = Ams.isForFactoryTest() && Ams.isAmplifierChannelMuteExist();
                        if (btn_amp_on_off.enabled) {
                            btn_amp_on_off.updateView();
                        }
                        if (rec_karaoke_settings.enabled) {
                            sw_karaoke_switch.updateView();
                            comboBox_accompany_source.setModel(!Ams.isHasSpdifRoute());
                            row_accompany_source.visible = Ams.isCanSwitchAccompanySource(); //指定的型号、版本才有此选项
                            comboBox_accompany_source.updateView();
                        }
                        btn_signal_detection.updateView();
                        io.updateView();
                        io.enableAll(); //要在io.updateView()后调用
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(io.currentOutput)), true);
                        row_check.updateAlias();
                        row_check.updateCheck(io.currentOutput);
                        rep_outgrp.updateViewOfHalfChecked();
                        if (channel_vol.visible) {
                            updChanle(); //更新通道音量标签上显示的通道
                            channel_vol.updateView();
                        }
                        row_check.updateLocalUI();
                        rep_outgrp.itemAt(io.currentOutput).label_checked = true; //避免在所有输出通道都未配置输入源的情况下，刷新界面后不高亮显示当前选中输出通道的问题
                        rep_outgrp.itemAt(io.currentOutput).focus = true;
                        btn_bridge_joint_gh.updateView();
                        btn_bridge_joint_ij.updateView();
                        btn_bridge_joint_kl.updateView();
                        btn_bridge_joint_mn.updateView();
                        btn_bridge_joint_op.updateView();
                        if (Ams.isHasGainDetectModule()) {
                            timer_meter.setMeterEnable(true);
                        }
                    } else if (currentIndex == 1) { //“主菜单”界面
                        channel_vol.visible = true;
                        dsp_frame.masterChanged();//总是假定io调整了当前master
                        rep_outgrp.itemAt(io.currentOutput).focus = true;
                        btn_bridge_joint_gh.updateView();
                        btn_bridge_joint_ij.updateView();
                        btn_bridge_joint_kl.updateView();
                        btn_bridge_joint_mn.updateView();
                        btn_bridge_joint_op.updateView();
                        if (Ams.isHasGainDetectModule()) {
                            timer_meter.setMeterEnable(true);
                        }
                    } else if (currentIndex == 2) { //“关于”界面
                        if (Ams.isHasGainDetectModule()) {
                            timer_meter.setMeterEnable(false);
                        }
                        channel_vol.visible = false;
                        sf.updateView(2);
                    }else if(currentIndex == 3){ //“时间”界面
                        channel_vol.visible = false;
                        sf.updateView(3);
                        if (Ams.isHasGainDetectModule()) {
                            timer_meter.setMeterEnable(true);
                        }
                    } else if (currentIndex == 4) { //“输入源EQ配置”界面
                        channel_vol.visible = false;
                        sf.updateView(0);
                        if (Ams.isHasGainDetectModule()) {
                            timer_meter.setMeterEnable(true);
                        }
                    } else {
                        if (Ams.isHasGainDetectModule()) {
                            timer_meter.setMeterEnable(false);
                        }
                        sf.updateView(0);
                    }
                    if (currentIndex != 0 && timer_refresh_stream_info.running) {
                        timer_refresh_stream_info.stop();
                    }

                    //console.log("stacks.currentIndex = " + stacks.currentIndex);
                }
                Item{
                    id:io_frame
                    function switchOutput(ch)
                    {
                        io.currentOutput=ch;
                        out_alias.updateRadio(Ams.getOutputChAlias(Ams.getOutputCmdLineIdxByViewIdx(ch)), true);
                    }
                    /*
                  RowLayout {
                        id:input_row
                        QC14.ExclusiveGroup { id: out_chn }
                      y:10
                      x:6
                      spacing:6
                      Repeater{
                          model: Ams.DspCfgData //Ams.labels
                         DspRadioBox{// RadioButton {
                          //text:checked?'<font color="white" size="5"><strong>'+ Ams.labels[index].name+'</strong></font>':'<font color="gray" size="5"><strong>'+ Ams.labels[index].name+'</strong></font>';
                          text:checked?'<font color="green" size="3"><strong>'+ Ams.getOutputName(index)+'</strong></font>':'<font color="#b0b0b0" size="2"><strong>'+ Ams.getOutputName(index)+'</strong></font>';
                          id:rb
                          exclusiveGroup: out_chn
                          Component.onCompleted: {
                          checked=index==Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster())?true:false;
                          }
        //                  style: RadioButtonStyle {
        //                      indicator: Rectangle {
        //                              implicitWidth: 16
        //                              implicitHeight: 16
        //                              radius: 9
        //                              border.color: rb.activeFocus ? "darkblue" : "gray"
        //                              border.width: 1
        //                              Rectangle {
        //                                  anchors.fill: parent
        //                                  visible: rb.checked
        //                                  color: "blue"//
        //                                  radius: 9
        //                                  anchors.margins: 4
        //                              }
        //                      }
        //                  }
                          onCheckedChanged: {
                          if(checked)
                          io_frame.switchOutput(index);
                          }
                          }
                      }
                  }
                  */
                    IoFrame {
                        id:io
                        anchors.left:parent.left;
                        anchors.top: parent.top
//                        anchors.topMargin: -11
                        anchors.topMargin: 0
                        anchors.right: out_alias.left
                        anchors.rightMargin: 6 + 6
//                        height: stacks.height - (showTabBar ? 25 : 0)
                        anchors.bottom:  parent.bottom
                        anchors.bottomMargin:  5
                        currentidx: root.dig_idx
                        dropRowSpacing: row_check.spacing
                        showTabBar: bar_rca_or_amp.visible || bar_routings.visible
                        onSourceChanged: {
//                            console.log("IoFrame.onSourceChanged: outputIndex = " + outputIndex + ", isDropAreaActived = " + isDropAreaActived);
                            if (isDropAreaActived) {
                                currentOutput = outputIndex;
                            } else {
                                io.updateView(isDropAreaActived); //当前通道未被选中，调用以刷新“输入输出”界面后立即返回
                                return;
                            }

                            if (rep_outgrp.itemAt(outputIndex).label_checked == true) {
                                io.updateView(isDropAreaActived); //当前通道已被选中(即当前操作的是主通道)，则应调用以刷新“输入输出”界面，否则不会刷新
                            } else {
                                rep_outgrp.itemAt(outputIndex).label_checked = true;
                            }

                            row_check.updateCheck(currentOutput);
                        }
                        onToast: {
                            toast.show(tip);
                        }

                        onInputDLCVisibleChanged: {
                            if (Ams.isHasGainDetectModule()) {
                                timer_meter.setMeterEnable(!visible);
                            }
                        }

                        WinSignalDetection {
                            id:signal_detection_win
                            parent: root.contentItem
                            x: (root.width-width)/ 2
                            y: (root.height-height)/2

                            onRemixModeChanged: {
                                btn_signal_detection.updateView();
                            }
                        }
                    }
                    AmsAlias{
                        id:out_alias
                        anchors.top: io.top;
                        anchors.topMargin: - ( row_check.anchors.topMargin + row_check.height + 1)
//                        anchors.left: io.right
//                        anchors.topMargin: -78 + (io.hasMeter ? 0 : 12)
//                        anchors.leftMargin: 9
                        anchors.right: parent.right
                        anchors.rightMargin: 5
                        //height: 533 - (sw_dts.checked || rec_signal_detection.enabled ? (rec_signal_detection.height) : (rec_karaoke_settings.visible ? 6 : 0)) - (bar_routings.visible ? 25 : 0) - (rec_karaoke_settings.visible ? (rec_karaoke_settings.height + rec_karaoke_settings.anchors.topMargin) : 0)
                        height: sub_area.height + (bar_rca_or_amp.visible ? bar_rca_or_amp.height : 0) - (bar_rca_or_amp.visible || bar_routings.visible ? 25 : 0) - (rec_signal_detection.visible ? (rec_signal_detection.height + rec_signal_detection.anchors.topMargin) : 0) - (rec_karaoke_settings.visible ? (rec_karaoke_settings.height + rec_karaoke_settings.anchors.topMargin) : 0) - (frm_stream_info.visible ? (frm_stream_info.height + frm_stream_info.anchors.topMargin + stream_info_title.height + stream_info_title.anchors.topMargin) : 0) - (btn_a2b_params_setting.visible ? (btn_a2b_params_setting.height + btn_a2b_params_setting.anchors.topMargin) : 0) - (btn_input_eq.visible ? (btn_input_eq.height + btn_input_eq.anchors.topMargin) : 0) - (btn_amp_on_off.visible ? (btn_amp_on_off.height + btn_amp_on_off.anchors.topMargin) : 0)
                        outputAliasName:root.output_alias
                        onRadioIndexChanged: {
//                            console.log("setOutputChAlias parm: " + io.currentOutput + ", " + radioIndex);
                            if (Ams.isOutputChAliasInUse(io.currentOutput, radioIndex)) {
                                msgbox_used.aliasIndexHandler(io.currentOutput, radioIndex);
                            } else {
                                msgbox_load.aliasIndexHandler(io.currentOutput, radioIndex);
                            }
                        }
                    }

                    Item {
                        id: rec_karaoke_settings
                        anchors.left: out_alias.left
                        anchors.top: out_alias.bottom
                        anchors.topMargin: 10
                        width: 133
                        height: karaoke_settings_title.height + karaoke_settings_content.height + karaoke_settings_content.anchors.topMargin
                        enabled: false
                        visible: enabled

                        Rectangle{
                            id: karaoke_settings_title
                            anchors.left: parent.left
                            anchors.top: parent.top
                            width: 133
                            height: 28
                            border.width: 1
                            border.color: "#485056"
                            color: "#1e2d3f"

                            Image {
                                id: karaoke_settings_img
                                anchors.left: parent.left
                                anchors.leftMargin: 6
                                anchors.verticalCenter: parent.verticalCenter
                                source: "qrc:///image/images/arrow.png"
                            }

                            Label{
                                text:qsTr("卡拉OK配置")
                                anchors.verticalCenter: parent.verticalCenter
                                anchors.left: karaoke_settings_img.right
                                anchors.leftMargin: 13
                                //anchors.horizontalCenter: parent.horizontalCenter
                                font.bold: true
                                font.pixelSize: 14
                                color: "#93bcef"
                            }

                            WinKaraokeSettings {
                                id: karaoke_settings_win
                                parent: root.contentItem
                                x: (root.width-width)/ 2
                                y: (root.height-height)/2
                            }
                        }

                        Rectangle{
                            id: karaoke_settings_content
                            width: 133
                            height: row_accompany_source.visible ? 86 : 66
                            anchors.top: karaoke_settings_title.bottom
                            anchors.topMargin: -1
                            anchors.left: karaoke_settings_title.left
                            gradient: Gradient {
                                GradientStop { position: 0.0; color: "#010406" }
                                GradientStop { position: 1.0; color: "#1e3142" }
                            }
                            border.color: "#485056"
                            border.width: 1

                            Column {
                                anchors.centerIn: parent
                                spacing: row_accompany_source.visible ? 6 : 8

                                Item {
                                    id: item_karaoke_switch
                                    anchors.horizontalCenter: parent.horizontalCenter
                                    width: 110
                                    height: 17

                                    Text {
                                        text:qsTr("关闭")
                                        anchors.right: sw_karaoke_switch.left
                                        anchors.rightMargin: 6
                                        anchors.verticalCenter: item_karaoke_switch.verticalCenter
                                        font.bold: settings.fontBold
                                        font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                                        color:sw_karaoke_switch.checked?"#93bcef":"#fc7e24"

                                        MouseArea {
                                            anchors.fill: parent

                                            onClicked: {
                                                sw_karaoke_switch.checked = !sw_karaoke_switch.checked;
                                            }
                                        }
                                    }
                                    Switch {
                                        id:sw_karaoke_switch
                                        anchors.horizontalCenter: parent.horizontalCenter
                                        anchors.horizontalCenterOffset: (settings.lang == "cn")?1:4
                                        anchors.top: parent.top;
                                        width: 48
                                        height: parent.height
                                        indicator: Image {
                                            width: parent.width
                                            height: parent.height
                                            fillMode: Image.Stretch //拉伸填充
                                            source:sw_karaoke_switch.checked?"qrc:///image/images/switch-on.png":"qrc:///image/images/switch-off.png"
                                        }
                                        property bool isUpdateView: false

                                        onCheckedChanged: {
                                            if (sw_karaoke_switch.isUpdateView) {
                                                return;
                                            }

                                            Ams.setKaraokeMode(sw_karaoke_switch, checked ? 1 : 0);
                                            if (Ams.isHasRemixModeOptions()) {
                                                Ams.setRemixMode(sw_karaoke_switch, 2); //切换为经典模式
                                            }
                                            //io.updateView();
                                            stacks.currentIndexChanged();
                                        }

                                        function updateView() {
                                            isUpdateView = true;
                                            checked = Ams.getKaraokeMode() > 0 ? true : false;
                                            isUpdateView = false;
                                        }
                                    }
                                    Text {
                                        text:qsTr("开启")
                                        anchors.left: sw_karaoke_switch.right
                                        anchors.leftMargin: 6
                                        anchors.verticalCenter: item_karaoke_switch.verticalCenter
                                        font.bold: settings.fontBold
                                        font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                                        color:sw_karaoke_switch.checked?"#fc7e24":"#93bcef"

                                        MouseArea {
                                            anchors.fill: parent

                                            onClicked: {
                                                sw_karaoke_switch.checked = !sw_karaoke_switch.checked;
                                            }
                                        }
                                    }
                                }

                                Row {
                                    id: row_accompany_source
                                    spacing: 1
                                    anchors.horizontalCenter: parent.horizontalCenter
                                    Text {
                                        text:qsTr("伴奏源：")
                                        anchors.verticalCenter: comboBox_accompany_source.verticalCenter
                                        font.bold: settings.fontBold
                                        font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                                        color:"#93bcef"
                                    }
                                    DspComboBox {
                                        id: comboBox_accompany_source
                                        anchors.top: parent.top
                                        width: (settings.lang == "cn")?60:60
                                        height: 20
                                        isEnable: sw_karaoke_switch.checked && enabled
                                        font.bold: settings.fontBold
                                        font.pixelSize: (settings.lang == "cn")?14:13
                                        model: [qsTr("主机"), qsTr("模拟"), qsTr("数字")];
                                        currentIndex: 0
                                        property bool isUpdateView: false

                                        onCurrentIndexChanged: {
                                            if (comboBox_accompany_source.isUpdateView) {
                                                return;
                                            }

                                            Ams.setAccompanySource(comboBox_accompany_source, currentIndex);
                                            //io.updateView();
                                            stacks.currentIndexChanged();
                                        }

                                        function setModel(isReduce) {
                                            comboBox_accompany_source.isUpdateView = true;
                                            comboBox_accompany_source.currentIndex = 0;
                                            if (isReduce) {
                                                comboBox_accompany_source.model = [qsTr("主机"), qsTr("模拟")];
                                            } else {
                                                comboBox_accompany_source.model = [qsTr("主机"), qsTr("模拟"), qsTr("数字")];
                                            }
                                            comboBox_accompany_source.updateView();
                                            comboBox_accompany_source.isUpdateView = false;
                                        }

                                        function updateView() {
                                            comboBox_accompany_source.isUpdateView = true;
                                            currentIndex = Ams.getAccompanySource();
                                            comboBox_accompany_source.isUpdateView = false;
                                        }
                                    }
                                }

                                AmsButton4 {
                                    id: btn_karaoke_settings
                                    anchors.horizontalCenter: parent.horizontalCenter
                                    width: 110
                                    height: 22
                                    property string viewText: qsTr("参数配置")
                                    txt:viewText
                                    enabled: sw_karaoke_switch.checked

                                    onClicked: {
                                        if (Ams.isDspBypass()) {
                                            toast.show(qsTr("DSP直通已开启，请关闭后再试。"));
                                            return;
                                        } else if (!Ams.getKaraokeMode()) {
                                            toast.show(qsTr("卡拉OK未开启"));
                                            return;
                                        }

                                        karaoke_settings_win.open();
                                    }
                                }
                            }
                        }
                    }

                    Item {
                        id: rec_signal_detection
                        anchors.left: out_alias.left
                        anchors.top: rec_karaoke_settings.visible ? rec_karaoke_settings.bottom : out_alias.bottom
                        anchors.topMargin: 10
                        width: 133
                        height: signal_detection_title.height + signal_detection_content.height + signal_detection_content.anchors.topMargin
//                        anchors.topMargin: 19
                        enabled: false
                        visible: enabled && !sw_dts.checked

                        Rectangle{
                            id: signal_detection_title
                            anchors.left: parent.left
                            anchors.top: parent.top
                            width: 133
                            height: 28
                            border.width: 1
                            border.color: "#485056"
                            color: "#1e2d3f"

                            Image {
                                id: signal_detection_img
                                anchors.left: parent.left
                                anchors.leftMargin: 6
                                anchors.verticalCenter: parent.verticalCenter
                                source: "qrc:///image/images/arrow.png"
                            }

                            Label{
                                text:qsTr("混音模式选择")
                                anchors.verticalCenter: parent.verticalCenter
                                anchors.left: signal_detection_img.right
                                anchors.leftMargin: 13
                                //anchors.horizontalCenter: parent.horizontalCenter
                                font.bold: true
                                font.pixelSize: 14
                                color: "#93bcef"
                            }
                        }

                        Rectangle{
                            id: signal_detection_content
                            width: 133
                            height: (rec_karaoke_settings.visible && row_accompany_source.visible) || btn_a2b_params_setting.visible ? 40 : 60
                            anchors.top: signal_detection_title.bottom
                            anchors.topMargin: -1
                            anchors.left: signal_detection_title.left
                            gradient: Gradient {
                                GradientStop { position: 0.0; color: "#010406" }
                                GradientStop { position: 1.0; color: "#1e3142" }
                            }
                            border.color: "#485056"
                            border.width: 1

                            AmsButton4 {
                                id: btn_signal_detection
                                anchors.centerIn: parent
                                width: (settings.lang == "pt" || settings.lang == "es") ? 128 : 112
                                height: rec_karaoke_settings.visible ? 22 : 26
                                property string viewText: qsTr("混音模式选择")
                                txt:viewText
                                enabled: rec_karaoke_settings.visible ? !sw_karaoke_switch.checked : true

                                function updateView() {
                                    viewText = signal_detection_win.getRemixModeName();
                                }

                                onClicked: {
                                    if (Ams.isDspBypass()) {
                                        toast.show(qsTr("DSP直通已开启，请关闭后再试。"));
                                        return;
                                    }

                                    /* 已进行自动切换模式绑定的模式不允许操作 */
                                    if (Ams.isModeAutoSwitchExist()) {
                                        var curModePair = Ams.getModeAutoSwitchPair();
                                        if ((curModePair[0] < 8 && curModePair[1] < 8)) {
                                            var activeMode = Ams.getActiveConfigMode();
                                            if (curModePair.some(function(item) { return activeMode === item; })) {
                                                toast.show(qsTr("请先解除自动切换模式绑定！"));
                                                return;
                                            }
                                        }
                                    }

                                    signal_detection_win.open();
                                }
                            }
                        }
                    }

                    AmsButton3 {
                        id: btn_a2b_params_setting
                        anchors.left: out_alias.left
                        anchors.top: rec_signal_detection.visible ? rec_signal_detection.bottom : (rec_karaoke_settings.visible ? rec_karaoke_settings.bottom : out_alias.bottom)
                        anchors.topMargin: 10
                        width: 133
                        height: 28
                        visible: enabled
                        property string viewText: qsTr("原车音效配置")
                        txt:viewText
//                        tooltip: viewText
                        onClicked: {
                            a2b_params_setting_frm.open();
                        }
                    }

                    AmsButton3 {
                        id: btn_input_eq
                        anchors.left: out_alias.left
                        anchors.top: btn_a2b_params_setting.visible ? btn_a2b_params_setting.bottom : (rec_signal_detection.visible ? rec_signal_detection.bottom : (rec_karaoke_settings.visible ? rec_karaoke_settings.bottom : out_alias.bottom))
                        anchors.topMargin: 10
                        width: 133
                        height: 28
                        visible: enabled
                        property alias selected: ioInputEQ.visible
                        property string viewText: qsTr("输入源EQ配置")
                        txt:viewText
//                        tooltip: viewText
                        onClicked: {
                            if (Ams.isForFactoryTest()) {
                                selected=false;
                                io_button.selected=true;
                                toast.show(qsTr("车间专稿，无此功能。"));
                            } else {
                                if (Ams.isDspBypass()) {
                                    selected=false;
                                    io_button.selected=true;
                                    toast.show(qsTr("DSP直通已开启，请关闭后再试。"));
                                    return;
                                }

                                selected = true;

                                if (selected) {
                                    io_button.selected=false;
                                    dsp_button.selected=false;
                                    setting_button.selected=false;
                                    time_button.selected=false;
                                    manu_bar_buttons.current_selected=4;
                                }
                            }
                        }
                    }

                    AmsButton3 {
                        id: btn_amp_on_off
                        anchors.left: out_alias.left
                        anchors.top: rec_signal_detection.visible ? rec_signal_detection.bottom : (rec_karaoke_settings.visible ? rec_karaoke_settings.bottom : out_alias.bottom)
                        anchors.topMargin: 10
                        width: 133
                        height: 28
                        checkable: true
                        enabled: false
                        visible: enabled
                        property string viewText: qsTr("功放开关：") + (checked ? qsTr("开") : qsTr("关"))
                        txt:viewText
//                        tooltip: viewText
                        property bool isUpdateView: false

                        onCheckedChanged: {
                            if (btn_amp_on_off.isUpdateView) {
                                return;
                            }
                            var output_list = [];
                            for (var i = 0; i < Ams.getAllIndepOutputsLength(); i++) {
                                //if ((Ams.getUniversalOutputsLength() == 0 || (i >= Ams.getUniversalOutputsLength() || Ams.isInSharedChannels(i))) && !Ams.isInBridgeJointChannels(i)) {
                                    output_list.push(i);
                               // }
                            }
                            Ams.setMutiChAmplifierChannelMute(btn_amp_on_off, output_list, !checked);
                        }

                        function updateView() {
                            btn_amp_on_off.isUpdateView = true;
                            var state = true;
                            var output_list = [];
                            for (var i = 0; i < Ams.getAllIndepOutputsLength(); i++) {
                                if ((Ams.getUniversalOutputsLength() == 0 || (i >= Ams.getUniversalOutputsLength() || Ams.isInSharedChannels(i))) && !Ams.isInBridgeJointChannels(i)) {
                                    if (Ams.getCurRoutingCfgData(i).amp_mute) {
                                        state = false;
                                        break;
                                    }
                                }
                            }
                            checked = state;
                            btn_amp_on_off.isUpdateView = false;
                        }
                    }

                    Rectangle {
                        id:stream_info_title
                        anchors.left: out_alias.left
                        anchors.top: out_alias.bottom
                        anchors.topMargin: 10
                        width:133
                        height: 28
                        visible: sw_dts.checked
                        border.width: 1
                         border.color: "#485056"
                        color:"#1e2d3f"

//                        Image {
//                            id: img_stream_info
//                            anchors.left: parent.left
//                            anchors.leftMargin: 6
//                            anchors.verticalCenter: parent.verticalCenter
//                            source: "qrc:///image/images/arrow.png"
//                        }
                        Label {
                            text:qsTr("输入源信息")
                            id:label_stream_info
//                            anchors.verticalCenter: parent.verticalCenter
//                            anchors.left: img_stream_info.right
//                            anchors.leftMargin: 13
                            //anchors.horizontalCenter: parent.horizontalCenter
                            anchors.centerIn: parent
                            font.bold: true
                            font.pixelSize: 14
                            color: "#93bcef"
                        }
                    }
                    Rectangle {
                        id: frm_stream_info
                        anchors.top: stream_info_title.bottom
                        anchors.topMargin: -1
                        anchors.left: stream_info_title.left
                        width: 133
                        height: 60 //85
                        visible: sw_dts.checked
                        gradient: Gradient {
                            GradientStop { position: 0.0; color: "#010406" }
                            GradientStop { position: 1.0; color: "#1e3142" }
                        }
                        border.color: "#485056"
                        border.width: 1
                        property var disabledText: "- -"

                        Column {
                            anchors.left: parent.left
                            anchors.leftMargin: (settings.lang == "cn")?13:10
                            anchors.top: parent.top
                            anchors.topMargin: 12
                            width: 50
                            height: parent.height
                            spacing: 10

                            Label {
                                text:qsTr("类型：")
                                anchors.right: parent.right
                                anchors.rightMargin: 6
                                font.bold: true
                                font.pixelSize: 14
                                color: "#93bcef"

                                Label {
                                    id: label_stream_type
                                    text: frm_stream_info.disabledText
                                    anchors.left: parent.right
                                    anchors.top: parent.top
                                    font.bold: settings.fontBold
                                    font.pixelSize: 14
                                    color: "#93bcef"
                                }
                            }
                            Label {
                                text:qsTr("通道：")
                                anchors.right: parent.right
                                anchors.rightMargin: 6
                                font.bold: true
                                font.pixelSize: 14
                                color: "#93bcef"

                                Label {
                                    id: label_stream_channel
                                    text: frm_stream_info.disabledText
                                    anchors.left: parent.right
                                    anchors.top: parent.top
                                    font.bold: settings.fontBold
                                    font.pixelSize: 14
                                    color: "#93bcef"
                                }
                            }
//                            Label {
//                                text:qsTr("频率：")
//                                anchors.right: parent.right
//                                anchors.rightMargin: 6
//                                font.bold: true
//                                font.pixelSize: 14
//                                color: "#93bcef"

//                                Label {
//                                    id: label_stream_sample
//                                    text: frm_stream_info.disabledText
//                                    anchors.left: parent.right
//                                    anchors.top: parent.top
//                                    font.bold: settings.fontBold
//                                    font.pixelSize: 14
//                                    color: "#93bcef"
//                                }
//                            }
                        }

                        /* 定时获取当前播放流信息 */
                        Timer {
                            id: timer_refresh_stream_info
                            running: false
                            repeat: true
//                            triggeredOnStart: true
                            interval: 1000 //间隔1s检测一次

                            onTriggered: {
                                if (Ams.isDtsEnabled() && Ams.getDtsInputType() == Ams.ANALOG) {
                                    handleData(-1, "stream_status?1:1?2:1?3:2"); //当前为模拟输入源时播放流信息信息固定为：PCM,2.0,48KHz
                                    return;
                                }
                                Ams.devGetStreamStatus(timer_refresh_stream_info);
                            }

                            onRunningChanged: {
                                if (!running) {
                                    io.dtsPcmModeEnabed = false;
                                    label_stream_type.text = frm_stream_info.disabledText;
                                    label_stream_channel.text = frm_stream_info.disabledText;
//                                    label_stream_sample.text = frm_stream_info.disabledText;
                                }
                            }

                            function handleData(cmdIdx, strRet) {
                                var index = strRet.indexOf('?');
                                var cmd = strRet.substring(0, index);
                                var data = strRet.substring(index + 1);
                                if (cmd == "stream_status") {
                                    var dtsEnabled = Ams.isDtsEnabled();
                                    if (dtsEnabled && running) {
                                        var streamInfo;
                                        streamInfo = Ams.streamInfoParse(data);
                                        label_stream_type.text = getStreamTypeName(streamInfo.stream_type);
                                        if (label_stream_type.text == frm_stream_info.disabledText) {
                                            label_stream_channel.text = frm_stream_info.disabledText;
//                                            label_stream_sample.text = frm_stream_info.disabledText;
                                        } else {
                                            label_stream_channel.text = getStreamChannelName(streamInfo.stream_channel);
//                                            label_stream_sample.text = ((streamInfo.stream_type == 4)?getStreamSampleName(4)/*"96KHz"*/:getStreamSampleName(streamInfo.stream_sample));
                                        }
                                        io.dtsPcmModeEnabed = (streamInfo.stream_type == 1); //此控件仅对PCM_2_0有效
                                    } else {
                                        label_stream_type.text = frm_stream_info.disabledText;
                                        label_stream_channel.text = frm_stream_info.disabledText;
//                                        label_stream_sample.text = frm_stream_info.disabledText;
                                        io.dtsPcmModeEnabed = false;
                                    }
                                }
                            }

                            /* 由下标获取播放流类型名称 */
                            function getStreamTypeName(stream_type)
                            {
                                switch (stream_type) {
//                                case 0: //STREAM_TYPE_START
//                                    return "START";
                                case 1: //STREAM_TYPE_PCM_2_0
                                case 2: //STREAM_TYPE_PCM_5_1
                                    return "PCM";
                                case 3: //STREAM_TYPE_DTS
                                    return "DTS";
                                case 4: //STREAM_TYPE_DTS_96_24
                                    return "DTS 96/24";
                                case 5: //STREAM_TYPE_DTS_ES_MATRIX
                                case 6: //STREAM_TYPE_DTS_ES_DISCRETE
                                    return "DTS-ES";
                                case 7: //STREAM_TYPE_DOLBY_2CH
                                case 8: //STREAM_TYPE_DOLBY_5CH
                                    return "AC3";
                                case 9: //STREAM_TYPE_DOLBY_EX
                                    return "DD_EX";
//                                case 10: //STREAM_TYPE_END
//                                    return "END";
                                default:
                                    return frm_stream_info.disabledText;
                                }
                            }

                            /* 由下标获取播放流通道名称 */
                            function getStreamChannelName(stream_channel)
                            {
                                switch (stream_channel) {
//                                case 0: //STREAM_CHANNEL_START
//                                    return "START";
                                case 1: //STREAM_CHANNEL_2_0
                                    return "2.0";
                                case 2: //STREAM_CHANNEL_2_1
                                    return "2.1";
                                case 3: //STREAM_CHANNEL_5_1
                                    return "5.1";
                                case 4: //STREAM_TYPE_PCM_6_1
                                    return "6.1";
                                case 5: //STREAM_CHANNEL_7_1
                                    return "7.1";
//                                case 6: //STREAM_CHANNEL_END
//                                    return "END";
                                default:
                                    return frm_stream_info.disabledText;
                                }
                            }


                            /* 由下标获取播放流采样率名称 */
                            function getStreamSampleName(stream_sample)
                            {
                                switch (stream_sample) {
//                                case 0: //STREAM_SAMPLE_START
//                                    return "START";
                                case 1: //STREAM_SAMPLE_44_1K
                                    return "44.1KHz";
                                case 2: //STREAM_SAMPLE_48K
                                    return "48KHz";
                                case 3: //STREAM_SAMPLE_88_2K
                                    return "88.2KHz";
                                case 4: //STREAM_SAMPLE_96K
                                    return "96KHz";
                                case 5: //STREAM_SAMPLE_176_4K
                                    return "176.4KHz";
                                case 6: //STREAM_SAMPLE_192K
                                    return "192KHz";
//                                case 7: //STREAM_SAMPLE_END
//                                    return "END";
                                default:
                                    return frm_stream_info.disabledText;
                                }
                            }
                        }
                    }
                }
                Item{
                    id:dsp_frame;
                    function masterChanged()
                    {
                        //console.log("master changed event");
                        row_check.updateLocalUI();
                        grahp_frame.updateLocalUI();//next inform graph to update.
                    }

                    DspFrame{
                        id:grahp_frame
                        anchors.left:parent.left;
                        anchors.top: parent.top
                        channelNameBarHeight: row_check.anchors.topMargin + row_check.height + 1
                        anchors.right: parent.right
                        validHeight: sub_area.height + (bar_rca_or_amp.visible ? bar_rca_or_amp.height : 0)
//                        height: stacks.height  - (showTabBar ? 25 : 0)
                        //anchors.bottom: parent.bottom
                        //anchors.bottomMargin: 5
                        color:"#b1b1b1"
                        hasMeter: io.hasMeter
                        showTabBar: bar_rca_or_amp.visible || bar_routings.visible
                        Component.onCompleted: {
                            //var master_grp=Ams.getCurrentMaster();
                        }
                        /*
                        外部导致的组号变化，eq、q、freq值变化，都要调用这个函数去更新，由于这个控件自己的eq/q/freq变化也要通知外部
                        ，为了防止死循环： 外部命令调整->本控件调整后又触发外部调整。
                        */
                        function updateLocalUI()
                        {
                            channelChange();
                            channel_vol.updateView();
                            rep_outgrp.updateViewOfHalfChecked();
                        }
                    }
                }

            }

            /* 共用状态框A~D */
            Item {
                id: item_bridge_joint_ad
                x: row_check.x
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 4 + row_check.spacing * 3)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_ad
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: "#748590"
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_ad.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_ad.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_ad.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_ad.border.color
                    color: "#324a5f"

                    Label {
                        id: label_btn_bridge_joint_ad
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: "#91bced"
                        text: qsTr("与功放共用")
                    }
                }
            }

            /* 桥接开关G、H */
            Item {
                id: item_bridge_joint_gh
                x: row_check.x + (rep_outgrp.boxWidth + row_check.spacing) * 6
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 2 + row_check.spacing)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确

                MouseArea {
                    id: mouseArea_bridge_joint_gh_frame
                    anchors.fill: parent
                    hoverEnabled: true
                    acceptedButtons: Qt.NoButton
                }

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_gh
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: btn_bridge_joint_gh.checked ? "#fb8022" : (btn_bridge_joint_gh.pressed?"#424f5b":"#748590")
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_gh.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_gh.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_gh.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_gh.border.color
                    color: btn_bridge_joint_gh.checked ? "#fb8022" : (btn_bridge_joint_gh.pressed?"#2b3d4f":"#324a5f")

                    Label {
                        id: label_btn_bridge_joint_gh
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: btn_bridge_joint_gh.checked ? "white" : "#91bced"
                        text: btn_bridge_joint_gh.enabled ? qsTr("桥接") : qsTr("与功放共用")
                    }

                    MouseArea {
                        id: btn_bridge_joint_gh
                        anchors.fill: parent
                        property bool checked: false
                        property bool isUpdateView: false

                        onClicked: {
                            //console.log("item_bridge_joint_gh: onClicked");
                            checked = !checked;
                        }

                        onCheckedChanged: {
                            if (btn_bridge_joint_gh.isUpdateView) {
                                return;
                            }

                            if (checked) {
                                if (!Ams.isDebug && !Ams.isDemoMode()) {
                                    btn_bridge_joint_gh.enabled = false;
                                    busyView.show(qsTr("请稍候..."));
                                }

                                Ams.copyOutputBridgeJointChannel(item_bridge_joint_gh, 6, 7);
                            }

                            if (Ams.getDeviceType() === Ams.AB212) {
                                Ams.setOutputBridgeJoint(btn_bridge_joint_gh, 0, checked);
                            } else {
                                Ams.setOutputBridgeJoint(btn_bridge_joint_gh, 1, checked);
                            }
                            grahp_frame.isBridgeJoint_gh = checked;

                            if (checked) {
                                //io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                                //row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                                //dsp_frame.masterChanged();
                                root.updateView();
                            } else {
                                row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                            }

                            //root.initArray(Ams.getOutputsLength(),output_alias.length);
                            //root.adaptOutputRowWidthAndSpacing();
                            //io.updateView();
                        }

                        function handleData(cmdIdx, strRet) {
                            btn_bridge_joint_gh.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            busyView.hide();
                        }

                        function updateView() {
                            btn_bridge_joint_gh.isUpdateView = true;
                            if (Ams.getDeviceType() === Ams.AB212 && (Ams.getUniversalOutputsLength() > 0 && Ams.getCurrentOutputsTypeGroup() < Ams.AMP_OUTPUTS_GROUP_1)) {
                                checked = (Ams.getOutputBridgeJoint(0) === 1 ? true : false);
                            } else {
                                checked = (Ams.getOutputBridgeJoint(1) === 1 ? true : false);
                            }

                            grahp_frame.isBridgeJoint_gh = (item_bridge_joint_gh.isVisible && checked);
                            btn_bridge_joint_gh.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            btn_bridge_joint_gh.isUpdateView = false;
                        }
                    }
                }
            }

            /* 桥接开关I、J */
            Item {
                id: item_bridge_joint_ij
                x: row_check.x + (rep_outgrp.boxWidth + row_check.spacing) * 8
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 2 + row_check.spacing)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确

                MouseArea {
                    id: mouseArea_bridge_joint_ij_frame
                    anchors.fill: parent
                    hoverEnabled: true
                    acceptedButtons: Qt.NoButton
                }

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_ij
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: btn_bridge_joint_ij.checked ? "#fb8022" : (btn_bridge_joint_ij.pressed?"#424f5b":"#748590")
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_ij.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_ij.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_ij.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_ij.border.color
                    color: btn_bridge_joint_ij.checked ? "#fb8022" : (btn_bridge_joint_ij.pressed?"#2b3d4f":"#324a5f")

                    Label {
                        id: label_btn_bridge_joint_ij
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: btn_bridge_joint_ij.checked ? "white" : "#91bced"
                        text: btn_bridge_joint_ij.enabled ? qsTr("桥接") : qsTr("与功放共用")
                    }

                    MouseArea {
                        id: btn_bridge_joint_ij
                        anchors.fill: parent
                        property bool checked: false
                        property bool isUpdateView: false

                        onClicked: {
                            //console.log("item_bridge_joint_ij: onClicked");
                            checked = !checked;
                        }

                        onCheckedChanged: {
                            if (btn_bridge_joint_ij.isUpdateView) {
                                return;
                            }

                            if (checked) {
                                if (!Ams.isDebug && !Ams.isDemoMode()) {
                                    btn_bridge_joint_ij.enabled = false;
                                    busyView.show(qsTr("请稍候..."));
                                }

                                if (Ams.getDeviceType() === Ams.AB212) {
                                    Ams.copyOutputBridgeJointChannel(item_bridge_joint_ij, 6, 7);
                                } else {
                                    Ams.copyOutputBridgeJointChannel(item_bridge_joint_ij, 8, 9);
                                }
                            }

//                            if (Ams.getDeviceType() === Ams.AB212) {
//                                Ams.setOutputBridgeJoint(btn_bridge_joint_ij, 1, checked);
//                            } else {
                                Ams.setOutputBridgeJoint(btn_bridge_joint_ij, 0, checked);
//                            }
                            grahp_frame.isBridgeJoint_ij = checked;

                            if (checked) {
                                //io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                                //row_check.updateCheck(Ams.getCurrentMaster());
                                //dsp_frame.masterChanged();
                                root.updateView();
                            } else {
                                row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                            }

                            //root.initArray(Ams.getOutputsLength(),output_alias.length);
                            //root.adaptOutputRowWidthAndSpacing();
                            //io.updateView();
                        }

                        function handleData(cmdIdx, strRet) {
                            btn_bridge_joint_ij.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            busyView.hide();
                        }

                        function updateView() {
                            btn_bridge_joint_ij.isUpdateView = true;
                            if (Ams.getDeviceType() === Ams.AB212 && (Ams.getUniversalOutputsLength() > 0 && Ams.getCurrentOutputsTypeGroup() < Ams.AMP_OUTPUTS_GROUP_1)) {
                                checked = (Ams.getOutputBridgeJoint(1) === 1 ? true : false);
                            } else {
                                checked = (Ams.getOutputBridgeJoint(0) === 1 ? true : false);
                            }
                            grahp_frame.isBridgeJoint_ij = (item_bridge_joint_ij.isVisible && checked);
                            btn_bridge_joint_ij.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            btn_bridge_joint_ij.isUpdateView = false;
                        }
                    }
                }
            }

            /* 桥接开关K、L */
            Item {
                id: item_bridge_joint_kl
                x: row_check.x + (rep_outgrp.boxWidth + row_check.spacing) * 10
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 2 + row_check.spacing)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确

                MouseArea {
                    id: mouseArea_bridge_joint_kl_frame
                    anchors.fill: parent
                    hoverEnabled: true
                    acceptedButtons: Qt.NoButton
                }

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_kl
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: btn_bridge_joint_kl.checked ? "#fb8022" : (btn_bridge_joint_kl.pressed?"#424f5b":"#748590")
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_kl.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_kl.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_kl.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_kl.border.color
                    color: btn_bridge_joint_kl.checked ? "#fb8022" : (btn_bridge_joint_kl.pressed?"#2b3d4f":"#324a5f")

                    Label {
                        id: label_btn_bridge_joint_kl
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: btn_bridge_joint_kl.checked ? "white" : "#91bced"
                        text: btn_bridge_joint_kl.enabled ? qsTr("桥接") : qsTr("与功放共用")
                    }

                    MouseArea {
                        id: btn_bridge_joint_kl
                        anchors.fill: parent
                        property bool checked: false
                        property bool isUpdateView: false

                        onClicked: {
                            //console.log("item_bridge_joint_kl: onClicked");
                            checked = !checked;
                        }

                        onCheckedChanged: {
                            if (btn_bridge_joint_kl.isUpdateView) {
                                return;
                            }

                            if (checked) {
                                if (!Ams.isDebug && !Ams.isDemoMode()) {
                                    btn_bridge_joint_kl.enabled = false;
                                    busyView.show(qsTr("请稍候..."));
                                }

                                if (Ams.getDeviceType() === Ams.AB212) {
                                    Ams.copyOutputBridgeJointChannel(item_bridge_joint_kl, 8, 9);
                                } else {
                                    Ams.copyOutputBridgeJointChannel(item_bridge_joint_kl, 10, 11);
                                }

                            }

                            Ams.setOutputBridgeJoint(btn_bridge_joint_kl, 1, checked);
                            grahp_frame.isBridgeJoint_kl = checked;

                            if (checked) {
                                //io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                                //row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                                //dsp_frame.masterChanged();
                                root.updateView();
                            } else {
                                row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                            }

                            //root.initArray(Ams.getOutputsLength(),output_alias.length);
                            //root.adaptOutputRowWidthAndSpacing();
                            //io.updateView();
                        }

                        function handleData(cmdIdx, strRet) {
                            btn_bridge_joint_kl.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            busyView.hide();
                        }

                        function updateView() {
                            btn_bridge_joint_kl.isUpdateView = true;
                            checked = (Ams.getOutputBridgeJoint(1) === 1 ? true : false);
                            grahp_frame.isBridgeJoint_kl = (item_bridge_joint_kl.isVisible && checked);
                            btn_bridge_joint_kl.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            btn_bridge_joint_kl.isUpdateView = false;
                        }
                    }
                }
            }

            /* 桥接开关M、N */
            Item {
                id: item_bridge_joint_mn
                x: row_check.x + (rep_outgrp.boxWidth + row_check.spacing) * 12
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 2 + row_check.spacing)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确

                MouseArea {
                    id: mouseArea_bridge_joint_mn_frame
                    anchors.fill: parent
                    hoverEnabled: true
                    acceptedButtons: Qt.NoButton
                }

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_mn
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: btn_bridge_joint_mn.checked ? "#fb8022" : (btn_bridge_joint_mn.pressed?"#424f5b":"#748590")
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_mn.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_mn.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_mn.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_mn.border.color
                    color: btn_bridge_joint_mn.checked ? "#fb8022" : (btn_bridge_joint_mn.pressed?"#2b3d4f":"#324a5f")

                    Label {
                        id: label_btn_bridge_joint_mn
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: btn_bridge_joint_mn.checked ? "white" : "#91bced"
                        text: btn_bridge_joint_mn.enabled ? qsTr("桥接") : qsTr("与功放共用")
                    }

                    MouseArea {
                        id: btn_bridge_joint_mn
                        anchors.fill: parent
                        property bool checked: false
                        property bool isUpdateView: false

                        onClicked: {
                            //console.log("item_bridge_joint_mn: onClicked");
                            checked = !checked;
                        }

                        onCheckedChanged: {
                            if (btn_bridge_joint_mn.isUpdateView) {
                                return;
                            }

                            if (checked) {
                                if (!Ams.isDebug && !Ams.isDemoMode()) {
                                    btn_bridge_joint_mn.enabled = false;
                                    busyView.show(qsTr("请稍候..."));
                                }

                                Ams.copyOutputBridgeJointChannel(item_bridge_joint_mn, 12, 13);
                            }

                            Ams.setOutputBridgeJoint(btn_bridge_joint_mn, 0, checked);
                            grahp_frame.isBridgeJoint_mn = checked;

                            if (checked) {
                                //io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                                //row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                                //dsp_frame.masterChanged();
                                root.updateView();
                            } else {
                                row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                            }

                            //root.initArray(Ams.getOutputsLength(),output_alias.length);
                            //root.adaptOutputRowWidthAndSpacing();
                            //io.updateView();
                        }

                        function handleData(cmdIdx, strRet) {
                            btn_bridge_joint_mn.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            busyView.hide();
                        }

                        function updateView() {
                            btn_bridge_joint_mn.isUpdateView = true;
                            checked = (Ams.getOutputBridgeJoint(0) === 1 ? true : false);
                            grahp_frame.isBridgeJoint_mn = (item_bridge_joint_mn.isVisible && checked && Ams.getCurrentOutputsTypeGroup() != Ams.AMP_OUTPUTS_GROUP_2);
                            btn_bridge_joint_mn.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            btn_bridge_joint_mn.isUpdateView = false;
                        }
                    }
                }
            }

            /* 桥接开关O、P */
            Item {
                id: item_bridge_joint_op
                x: row_check.x + (rep_outgrp.boxWidth + row_check.spacing) * 14
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 2 + row_check.spacing)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确

                MouseArea {
                    id: mouseArea_bridge_joint_op_frame
                    anchors.fill: parent
                    hoverEnabled: true
                    acceptedButtons: Qt.NoButton
                }

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_op
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: btn_bridge_joint_op.checked ? "#fb8022" : (btn_bridge_joint_op.pressed?"#424f5b":"#748590")
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_op.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_op.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_op.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_op.border.color
                    color: btn_bridge_joint_op.checked ? "#fb8022" : (btn_bridge_joint_op.pressed?"#2b3d4f":"#324a5f")

                    Label {
                        id: label_btn_bridge_joint_op
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: btn_bridge_joint_op.checked ? "white" : "#91bced"
                        text: btn_bridge_joint_op.enabled ? qsTr("桥接") : qsTr("与功放共用")
                    }

                    MouseArea {
                        id: btn_bridge_joint_op
                        anchors.fill: parent
                        property bool checked: false
                        property bool isUpdateView: false

                        onClicked: {
                            //console.log("item_bridge_joint_op: onClicked");
                            checked = !checked;
                        }

                        onCheckedChanged: {
                            if (btn_bridge_joint_op.isUpdateView) {
                                return;
                            }

                            if (checked) {
                                if (!Ams.isDebug && !Ams.isDemoMode()) {
                                    btn_bridge_joint_op.enabled = false;
                                    busyView.show(qsTr("请稍候..."));
                                }

                                Ams.copyOutputBridgeJointChannel(item_bridge_joint_op, 14, 15);
                            }

                            Ams.setOutputBridgeJoint(btn_bridge_joint_op, 1, checked);
                            grahp_frame.isBridgeJoint_op = checked;

                            if (checked) {
                                //io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                                //row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                                //dsp_frame.masterChanged();
                                root.updateView();
                            } else {
                                row_check.updateCheck(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                            }

                            //root.initArray(Ams.getOutputsLength(),output_alias.length);
                            //root.adaptOutputRowWidthAndSpacing();
                            //io.updateView();
                        }

                        function handleData(cmdIdx, strRet) {
                            btn_bridge_joint_op.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            busyView.hide();
                        }

                        function updateView() {
                            btn_bridge_joint_op.isUpdateView = true;
                            checked = (Ams.getOutputBridgeJoint(1) === 1 ? true : false);
                            grahp_frame.isBridgeJoint_op = (item_bridge_joint_op.isVisible && checked && Ams.getCurrentOutputsTypeGroup() != Ams.AMP_OUTPUTS_GROUP_2);
                            btn_bridge_joint_op.enabled = (bar_rca_or_amp.showTabBar ? Ams.getCurrentOutputsTypeGroup() == Ams.AMP_OUTPUTS_GROUP_1 : true);
                            btn_bridge_joint_op.isUpdateView = false;
                        }
                    }
                }
            }

            /* 共用状态框M~P */
            Item {
                id: item_bridge_joint_mp
                x: row_check.x + (rep_outgrp.boxWidth + row_check.spacing) * 12
                anchors.bottom: row_check.bottom
//                anchors.bottomMargin: -2 + (io.hasMeter ? -12 : 0)
                anchors.bottomMargin: -2
                width: (rep_outgrp.boxWidth * 4 + row_check.spacing * 3)
//                height: row_check.height + 20
                height: row_check.height + 8
                visible: isVisible
                property bool isVisible: false //必须用此参数来替代直接使用visible，避免visible状态更新滞后导致的显示状态不正确
                property bool isAmpOutputsTypeGroup: false

                /* 背景框 */
                Rectangle {
                    id: rec_bridge_joint_bkg_mp
                    anchors.bottom: parent.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    width: parent.width + 4
//                    height: row_check.height + 12 + (io.hasMeter ? 12 : 0)
                    height: row_check.height + 12
                    radius: 3
                    border.width: 1
                    border.color: "#748590"
                    color: "transparent"
                }

                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: rec_bridge_joint_bkg_mp.top
                    anchors.topMargin: -(height / 2)
                    width: label_btn_bridge_joint_mp.width + ((settings.lang == "pt" || settings.lang == "es") && label_btn_bridge_joint_mp.text != qsTr("桥接") ? 10 : 36)
                    height: 16
                    radius: 3
                    border.color: rec_bridge_joint_bkg_mp.border.color
                    color: "#324a5f"

                    Label {
                        id: label_btn_bridge_joint_mp
                        anchors.centerIn: parent
                        font.bold: settings.fontBold
                        color: "#91bced"
                        text: item_bridge_joint_mp.isAmpOutputsTypeGroup ? qsTr("与RCA共用") : qsTr("与功放共用")
                    }
                }
            }
        }
    }

    IoInputEQ {
        id: ioInputEQ
        anchors.top: middle_and_bottom_area.top
        anchors.topMargin: 4
//		anchors.bottom: middle_and_bottom_area.bottom
        anchors.bottom: rec_ctrls.top
        //anchors.bottomMargin: 6
        anchors.left: middle_and_bottom_area.left
        anchors.leftMargin: 4
        anchors.right: middle_and_bottom_area.right
//        anchors.left: manu_bar_buttons.left
//        anchors.leftMargin: 4
//        anchors.top: manu_bar_buttons.bottom
//        anchors.topMargin: 6
        aliasHandler: io.aliasHandler
        hasMeter: io.hasMeter

        onChannelChanged: {

        }

        onBackToIOView: {
            btn_input_eq.selected = false;
            //row_check.updateCheck((stacks.currentIndex == 0)?io.currentOutput:Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
            io_button.selected = true;
        }

        onFlagChanged: {

        }
    }

    Item {
        id: rec_ctrls
//        visible: !root.isSetting
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 8
        anchors.left: work_area.left
        anchors.leftMargin: 4
        anchors.right: parent.right
        anchors.rightMargin:  widthAmsAlias
//        width: sub_area.width
        height: 57

        DspVolume {
            id:main_vol
            anchors.leftMargin: 18
            anchors.verticalCenter: parent.verticalCenter
            maxLenth:2
            anchors.left: rec_ctrls.left
            vol_name:qsTr("总音量：")
            dw: ""
            property int mainVolGetCmdIdx: -1
            property int mainMuteGetCmdIdx: -1
            property int mainVolSetCmdIdx: -1
            property int mainMuteSetCmdIdx: -1
            signal updateView();

            function resetState(interval) {
                if (Ams.isVSRxSeriesDevice()) {
                    mainVolGetCmdIdx = -1;
                    mainMuteGetCmdIdx = -1;
                    timer_refresh_vol_and_mute.interval = interval;
                    timer_refresh_vol_and_mute.restart();
                }
            }

            onVolumeChanged: {
                resetState(3000);
                mainVolSetCmdIdx = Ams.setMainVolume(main_vol, volume); //0~60
            }
            onMuteChanged: {
                resetState(3000);
                mainMuteSetCmdIdx = Ams.setMainMute(main_vol, mute);
            }
            onUpdateView: {
                var readVol = Ams.getMainVolume();
                setViewVolume(readVol); //0~60
                var readMute = Ams.getMainMute();
                setViewMute(readMute);
            }
            onOutRangeError: {
                var readVol = Ams.getMainVolume();
                setViewVolume(readVol); //0~60
            }
            //        onHandleData: {
            //            console.log("ApplicationWindow::DspVolume main_vol.onHandleData:" + msg);
            //        }

            onInputGetFocus: {
                resetState(3000);
            }

            onInputChanging: {
                resetState(3000);
            }

            function handleData(cmdIdx, strRet) {
                if (cmdIdx === -1) {
                    return;
                }

                if (Ams.isVSRxSeriesDevice()) {

                    if (cmdIdx === mainVolSetCmdIdx) {
                        mainVolSetCmdIdx = -1;
                        return;
                    } else if (cmdIdx === mainMuteSetCmdIdx) {
                        mainMuteSetCmdIdx = -1;
                        return;
                    } else if (cmdIdx !== mainVolGetCmdIdx && cmdIdx !== mainMuteGetCmdIdx) {
                        return;
                    }

                    if (mainVolSetCmdIdx > 0 || mainMuteSetCmdIdx > 0) {
                        return;
                    }

                    if (cmdIdx === mainVolGetCmdIdx) {
                        mainVolGetCmdIdx = -1;
                        Ams.loadCurConfigModeRespParse(strRet);
//                        main_vol.updateView();
                    } else if (cmdIdx === mainMuteGetCmdIdx) {
                        mainMuteGetCmdIdx = -1;
                        Ams.loadCurConfigModeRespParse(strRet);
                        main_vol.updateView();
                        timer_refresh_vol_and_mute.interval = 250;
                        timer_refresh_vol_and_mute.restart();
                    }
                }
            }

            Timer {
                id: timer_refresh_vol_and_mute
                interval: 250
                repeat: true
                onTriggered: {
                    //if (Ams.isShowCmdLog) return; //Debug
                    if (main_vol.mainVolGetCmdIdx == -1) {
                        main_vol.mainVolGetCmdIdx = Ams.devGetMainVolume(main_vol);
                    }
                    if (main_vol.mainMuteGetCmdIdx == -1) {
                        main_vol.mainMuteGetCmdIdx = Ams.devGetMainMute(main_vol);
                    }
                }
            }
        }

        Row {
            id: col_dts_opts
            property bool isHasDts: false
            visible: (isHasDts && stacks.currentIndex==0)
            spacing: (settings.lang == "cn")?40:23
            anchors.left: main_vol.right
            anchors.leftMargin: (settings.lang == "cn")?11:25
            anchors.verticalCenter: parent.verticalCenter

            Row {
                id: row_dts_sw
                spacing: (settings.lang == "cn")?8:6
                anchors.verticalCenter: parent.verticalCenter

                Text {
                    text:qsTr("环绕声解码：")
                    anchors.bottom: item_dts_sw.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:"#93bcef"
                }
                Text {
                    text:qsTr("关闭")
                    anchors.bottom: item_dts_sw.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:sw_dts.checked?"#93bcef":"#fc7e24"

                    MouseArea {
                        anchors.fill: parent

                        onClicked: {
                            sw_dts.checked = !sw_dts.checked;
                        }
                    }
                }
                Item {
                    id: item_dts_sw
                    anchors.verticalCenter: parent.verticalCenter
                    width: 48
                    height: 17
                    Switch {
                        id:sw_dts
                        anchors.top: parent.top;
                        width: parent.width
                        height: parent.height
                        indicator: Image {
                            width: item_dts_sw.width
                            height: item_dts_sw.height
                            fillMode: Image.Stretch //拉伸填充
                            source:sw_dts.checked?"qrc:///image/images/switch-on.png":"qrc:///image/images/switch-off.png"
                        }
                        property bool isUpdateView: false

                        onCheckedChanged: {
                            if (sw_dts.isUpdateView) {
                                return;
                            }

                            if (sw_dts.checked) {
                                if (!timer_refresh_stream_info.running) {
                                    timer_refresh_stream_info.start();
                                }
                            } else {
                                if (timer_refresh_stream_info.running) {
                                    timer_refresh_stream_info.stop();
                                }
                            }

                            Ams.setDtsEnabled(sw_dts, checked);
                            io.updateView();
                        }

                        function updateView() {
                            sw_dts.isUpdateView = true;
                            sw_dts.checked = (Ams.isDtsEnabled() && !Ams.isVSRxSeriesDevice());
                            if (sw_dts.checked) {
                                if (!timer_refresh_stream_info.running) {
                                    timer_refresh_stream_info.start();
                                }
                            } else {
                                if (timer_refresh_stream_info.running) {
                                    timer_refresh_stream_info.stop();
                                }
                            }
                            sw_dts.isUpdateView = false;
                        }
                    }
                }
                Text {
                    text:qsTr("开启")
                    anchors.bottom: item_dts_sw.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:sw_dts.checked?"#fc7e24":"#93bcef"

                    MouseArea {
                        anchors.fill: parent

                        onClicked: {
                            sw_dts.checked = !sw_dts.checked;
                        }
                    }
                }
            }

            Row {
                visible: sw_dts.checked
                spacing: (settings.lang == "cn")?8:6
                anchors.verticalCenter: parent.verticalCenter

                Text {
                    text:qsTr("输入源：")
                    anchors.bottom: item_dts_input_type.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:"#93bcef"
                }
                Text {
                    text:qsTr("数字")
                    anchors.bottom: item_dts_input_type.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:sw_dts_input_type.checked?"#93bcef":"#fc7e24"

                    MouseArea {
                        anchors.fill: parent

                        onClicked: {
                            sw_dts_input_type.checked = !sw_dts_input_type.checked;
                        }
                    }
                }
                Item {
                    id: item_dts_input_type
                    anchors.top: parent.top
                    width: 48
                    height: 17
                    Switch {
                        id:sw_dts_input_type
                        anchors.verticalCenter: parent.verticalCenter
                        width: parent.width
                        height: parent.height
                        indicator: Image {
                            width: item_dts_input_type.width
                            height: item_dts_input_type.height
                            fillMode: Image.Stretch //拉伸填充
                            source:sw_dts_input_type.checked?"qrc:///image/images/switch-on.png":"qrc:///image/images/switch-off.png"
                        }
                        property bool isUpdateView: false

                        onCheckedChanged: {
                            if (sw_dts_input_type.isUpdateView) {
                                return;
                            }
                            Ams.setDtsInputType(sw_dts_input_type, checked?Ams.ANALOG:Ams.DIGITAL);
                            io.currentDtsSrcRouting = checked?Ams.ANALOG:Ams.DIGITAL;
                            io.updateView();
                        }

                        function updateView() {
                            sw_dts_input_type.isUpdateView = true;
                            sw_dts_input_type.checked = (Ams.getDtsInputType()===Ams.ANALOG);
                            sw_dts_input_type.isUpdateView = false;
                        }
                    }
                }
                Text {
                    text:qsTr("模拟")
                    anchors.bottom: item_dts_input_type.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:sw_dts_input_type.checked?"#fc7e24":"#93bcef"

                    MouseArea {
                        anchors.fill: parent

                        onClicked: {
                            sw_dts_input_type.checked = !sw_dts_input_type.checked;
                        }
                    }
                }
            }
        }

        Row {
            id: col_dts_opts_RV
            property bool isHasDts: false
            property bool isHasSurround: false
            property bool isHasHdmiSwitch: false
            /* private */ property int  mySpacing: (settings.lang == "cn")?(row_dsd_out_type.width != 188 ? (row_hdmi_sw.visible ? 31 : 45) : (row_hdmi_sw.visible ? 35 : 48)):(row_dsd_out_type.width != 166 ? (row_hdmi_sw.visible ? 29 : 34) : (row_hdmi_sw.visible ? 27 : 31)) //针对高分屏适配的特殊处理
            visible: (isHasDts && !io.isDspBypass && stacks.currentIndex==0)
            spacing: mySpacing
            anchors.right: columnLayout.left
            anchors.rightMargin: mySpacing + (row_dts_out_type_RV.visible || row_hdmi_sw.visible ? 0 : (row_dsd_out_type.width + mySpacing))
            anchors.verticalCenter: parent.verticalCenter

            function setOutTypeModel(isReduceDts) {
                comboBox_dsd_out_type_RV.isUpdateView = true;
                comboBox_dsd_out_type_RV.currentIndex = 0;
                if (isReduceDts) {
                    comboBox_dsd_out_type_RV.model = ["2.0 " + qsTr("声道"), "5.1 " + qsTr("声道")];
                } else {
                    comboBox_dsd_out_type_RV.model = ["2.0 " + qsTr("声道"), "5.1 " + qsTr("声道"), "7.1 " + qsTr("声道")];
                }
                comboBox_dsd_out_type_RV.updateView();
                comboBox_dsd_out_type_RV.isUpdateView = false;
            }

            Row {
                id: row_dsd_out_type
                visible: comboBox_dts_out_type_RV.currentIndex < 1
                spacing: (settings.lang == "cn")?8:6
                anchors.verticalCenter: parent.verticalCenter
                Text {
                    text:qsTr("主机环绕解码：")
                    anchors.verticalCenter: parent.verticalCenter
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:"#93bcef"
                }
                DspComboBox {
                    id: comboBox_dsd_out_type_RV
                    anchors.verticalCenter: parent.verticalCenter
                    width: (settings.lang == "cn")?82:64
                    height: 20
                    isEnable: true
                    font.bold: settings.fontBold
                    font.pixelSize: (settings.lang == "cn")?14:13
                    model: ["2.0 " + qsTr("声道"), "5.1 " + qsTr("声道"), "7.1 " + qsTr("声道")];
                    currentIndex: 0
                    property bool isUpdateView: false

                    onCurrentIndexChanged: {
                        if (comboBox_dsd_out_type_RV.isUpdateView) {
                            return;
                        }
                        var lastDtsOutputTypeName = Ams.getDsdOutputTypeName();
                        Ams.setDsdOutputType(comboBox_dsd_out_type_RV, idxToVal(currentIndex));
                        io.setDigitalInputsCount(idxToVal(currentIndex));
                        Ams.filterDsdMasterSrcs(comboBox_dsd_out_type_RV, lastDtsOutputTypeName); //筛选保留共用输入源

                        io.updateView();
                    }

                    function updateView() {
                        comboBox_dsd_out_type_RV.isUpdateView = true;
                        var typeIdx = (Ams.isHasKaraokeRoute() && Ams.getKaraokeMode() > 0) ? 2 : Ams.getDsdOutputType();
                        currentIndex = valToIdx(typeIdx);
                        io.setDigitalInputsCount(idxToVal(currentIndex));
                        comboBox_dsd_out_type_RV.isUpdateView = false;
                    }

                    function idxToVal(idx) {
                        switch (idx) {
                        case 0:
                            return 2;
                        case 1:
                            return 6;
                        case 2:
                        default:
                            return 8;
                        }
                    }

                    function valToIdx(val) {
                        switch (val) {
                        case 2:
                            return 0;
                        case 6:
                            return 1;
                        case 8:
                        default:
                            return 2;
                        }
                    }
                }
            }

            Row {
                id: row_dts_out_type_RV
                visible: col_dts_opts_RV.isHasSurround
                spacing: (settings.lang == "cn")?8:6
                anchors.verticalCenter: parent.verticalCenter
                Text {
                    text:qsTr("虚拟环绕解码：")
                    anchors.verticalCenter: parent.verticalCenter
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:"#93bcef"
                }
                DspComboBox {
                    id: comboBox_dts_out_type_RV
                    anchors.verticalCenter: parent.verticalCenter
                    width: (settings.lang == "cn")?82:64
                    height: 20
                    isEnable: true
                    font.bold: settings.fontBold
                    font.pixelSize: (settings.lang == "cn")?14:13
                    model:[qsTr("关闭"), "5.1 " + qsTr("声道"), "7.1 " + qsTr("声道")];
                    currentIndex: 0
                    property bool isUpdateView: false

                    onCurrentIndexChanged: {
                        if (isUpdateView) {
                            return;
                        }

                        if (currentIndex > 0) {
                            var curDtsOutputType = idxToVal(currentIndex);
                            var lastDtsOutputTypeName = Ams.getDtsOutputTypeName();
                            if (curDtsOutputType !== Ams.getDtsOutputType()) {
                                Ams.setDtsOutputType(comboBox_dts_out_type_RV, curDtsOutputType);
                                Ams.filterDtsRoutingSrcs(comboBox_dts_out_type_RV, lastDtsOutputTypeName); //筛选保留共用输入源
                            }
                            if (!Ams.isDtsEnabled()) {
                                Ams.setDtsEnabled(comboBox_dts_out_type_RV, true);
                            }
                        } else {
                            Ams.setDtsEnabled(comboBox_dts_out_type_RV, false);
                        }

                        io.updateView();
                    }

                    function updateView() {
                        comboBox_dts_out_type_RV.isUpdateView = true;
                        if (Ams.isDtsEnabled()) {
                            currentIndex = valToIdx(Ams.getDtsOutputType());
                        } else {
                            currentIndex = 0;
                        }
                        comboBox_dts_out_type_RV.isUpdateView = false;
                    }

                    function idxToVal(idx) {
                        switch (idx) {
                        case 1:
                            return 6;
                        case 2:
                            return 8;
                        default:
                            return Ams.getDtsOutputType();
                        }
                    }

                    function valToIdx(val) {
                        switch (val) {
                        case 6:
                            return 1;
                        case 8:
                            return 2;
                        default:
                            return 0;
                        }
                    }
                }
            }

            Row {
                id: row_hdmi_sw
                visible: col_dts_opts_RV.isHasHdmiSwitch
                spacing: (settings.lang == "cn")?8:6
                anchors.verticalCenter: parent.verticalCenter

                Text {
                    text:qsTr("外部HDMI输入：")
                    anchors.bottom: item_hdmi_sw.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:"#93bcef"
                }
                Text {
                    text:qsTr("关闭")
                    anchors.bottom: item_hdmi_sw.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:sw_hdmi.checked?"#93bcef":"#fc7e24"
                    opacity: enabled ? 1 : 0.5

                    MouseArea {
                        anchors.fill: parent

                        onClicked: {
                            sw_hdmi.checked = !sw_hdmi.checked;
                        }
                    }
                }
                Item {
                    id: item_hdmi_sw
                    anchors.top: parent.top
                    width: 48
                    height: 17
                    opacity: enabled ? 1 : 0.5
                    Switch {
                        id:sw_hdmi
                        anchors.verticalCenter: parent.verticalCenter
                        width: parent.width
                        height: parent.height
                        indicator: Image {
                            width: item_hdmi_sw.width
                            height: item_hdmi_sw.height
                            fillMode: Image.Stretch //拉伸填充
                            source:sw_hdmi.checked?"qrc:///image/images/switch-on.png":"qrc:///image/images/switch-off.png"
                        }
                        property bool isUpdateView: false

                        onCheckedChanged: {
                            if (sw_hdmi.isUpdateView) {
                                return;
                            }

                            row_hdmi_sw.enabled = false;
                            timer_sw_hdmi.start();
                            Ams.setHdmiPlayState(sw_hdmi, checked);
                            io.updateView();
                        }

                        function updateView() {
                            sw_hdmi.isUpdateView = true;
                            sw_hdmi.checked = Ams.getHdmiPlayState();
                            sw_hdmi.isUpdateView = false;
                        }

                        Timer {
                            id: timer_sw_hdmi
                            interval: 3000
                            repeat: false
                            triggeredOnStart: false

                            onTriggered: {
                                row_hdmi_sw.enabled = true;
                            }
                        }
                    }
                }
                Text {
                    text:qsTr("开启")
                    anchors.bottom: item_hdmi_sw.bottom
                    anchors.bottomMargin: 1
                    font.bold: settings.fontBold
                    font.pixelSize: 14 /*(settings.lang == "cn")?18:15*/
                    color:sw_hdmi.checked?"#fc7e24":"#93bcef"
                    opacity: enabled ? 1 : 0.5

                    MouseArea {
                        anchors.fill: parent

                        onClicked: {
                            sw_hdmi.checked = !sw_hdmi.checked;
                        }
                    }
                }
            }
        }

        ColumnLayout {
            id: columnLayout
            visible: !root.isSetting
            anchors.right: parent.right
            anchors.rightMargin: 10
            anchors.verticalCenter: parent.verticalCenter
            spacing: 8
            property var current_gain_mode:"non"
            property var current_eq_mode: "non"
            property var init_eq_mode: "non"
            property var init_vol_mode: "non"
            RowLayout {
                id:row_vol_corrMode

                anchors.right: parent.right
                QC14.ExclusiveGroup { id: out_chn_vol }
                spacing:10
                property bool isUpdateView: false
                function updateView()
                {
                    isUpdateView = true;
                    switch (Ams.getVolCorrMode()) {
                    case "rel":
                        rep_mode_vol.itemAt(0).checked = true;
                        break;
                    case "abs":
                        rep_mode_vol.itemAt(1).checked = true;
                        break;
                    case "non":
                        rep_mode_vol.itemAt(2).checked = true;
                    }
                    isUpdateView = false;
                }
                Text {
                    id: gains
                    text: '<font color="#93bced" size="12px">'+qsTr("音量联动模式：")+'</font>';
                    color: "white"
                    font.bold: settings.fontBold
                    font.pixelSize: 14
                }

                Repeater{
                    id:rep_mode_vol
                    model:ListModel {
                        id: indicatorModel
                        ListElement {
                            name: qsTr("相对")
                        }
                        ListElement {
                            name: qsTr("绝对")
                        }
                        ListElement {
                            name: qsTr("不联动")
                        }
                    }
                    QC14.RadioButton {
                        text:(checked?'<font color="#fb7e22" size="12px">':'<font color="#91bced" size="12px">') + (settings.fontBold?'<strong>':'') + name + (settings.fontBold?'</strong>':'') + '</font>';
                        id:rb_join_vol
                        exclusiveGroup: out_chn_vol
                        property var init_mode: columnLayout.init_vol_mode;
                        onInit_modeChanged: {
                            var i=0;
                            switch(init_mode)
                            {
                            case "rel":i=0;break;
                            case "abs":i=1;break;
                            case "non":i=2;break;
                            }
                            if(i==index)checked=true;
                        }
                        style: RadioButtonStyle {
                            indicator: Image {
                                //id: name
                                source: rb_join_vol.checked?"qrc:///image/images/radio-selected.png":"qrc:///image/images/radio-deselected.png"
                            }
                            label: Label {
                                text: rb_join_vol.text
                                font.pixelSize: 14
                            }
                        }
                        onCheckedChanged: {
                            if (row_vol_corrMode.isUpdateView) {
                                return;
                            }
                            if(!rb_join_vol.focus){
                                rb_join_vol.focus=true;
                            }

                            if(checked)
                            {
                                switch(index)
                                {
                                case 0:
                                    columnLayout.current_gain_mode="rel";break;
                                case 1:
                                    columnLayout.current_gain_mode="abs";break;
                                case 2:
                                    columnLayout.current_gain_mode="non";break;
                                }
                                Ams.setVolCorrMode(columnLayout.current_gain_mode);
                                if (!Ams.isCorrelationMode()) {
                                    //Ams.disbandAllGroup(); //解散所有分组
                                    Ams.disbandAllOutputGroup();
                                    Ams.disbandAllStandardInputGroup();
                                    if (Ams.getCurrentActiveGroupsFlag() === Ams.OUTPUTS_GROUPS) {
                                        row_check.updateCheck((stacks.currentIndex == 0)?io.currentOutput:Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                                    } else {
                                        ioInputEQ.updateCheck();
                                    }
                                }
                            }
                        }
                    }
                }

            }

            RowLayout {
                id: row_eq_corrMode

                anchors.right: parent.right
                QC14.ExclusiveGroup { id: out_chn_eq }
                spacing:10
                property bool isUpdateView: false
                function updateView()
                {
                    isUpdateView = true;
                    switch (Ams.getEqCorrMode()) {
                    case "rel":
                        rep_mode_eq.itemAt(0).checked = true;
                        break;
                    case "abs":
                        rep_mode_eq.itemAt(1).checked = true;
                        break;
                    case "non":
                        rep_mode_eq.itemAt(2).checked = true;
                    }
                    isUpdateView = false;
                }
                Text {
                    id: text_eq
                    text:'<font color="#93bced" size="12px">'+ qsTr("均衡联动模式：") +'</font>';
                    color: "white"
                    font.bold: settings.fontBold;
                    font.pixelSize: 14
                }

                Repeater{
                    id:rep_mode_eq
                    model:ListModel {
                        id: indicatorModel_eq
                        ListElement {
                            name: qsTr("相对")
                        }
                        ListElement {
                            name: qsTr("绝对")
                        }
                        ListElement {
                            name: qsTr("不联动")
                        }
                    }
                    QC14.RadioButton {
                        text:(checked?'<font color="#fb7e22" size="12px">':'<font color="#91bced" size="12px">') + (settings.fontBold?'<strong>':'') + name + (settings.fontBold?'</strong>':'') + '</font>';

                        id:rb_eq
                        exclusiveGroup: out_chn_eq
                        property var init_mode: columnLayout.init_eq_mode;
                        onInit_modeChanged: {
                            var i=0;
                            switch(init_mode)
                            {
                            case "rel":i=0;break;
                            case "abs":i=1;break;
                            case "non":i=2;break;
                            }
                            if(i==index)checked=true;
                        }
                        style: RadioButtonStyle {
                            indicator: Image {
                                //id: name
                                source: rb_eq.checked?"qrc:///image/images/radio-selected.png":"qrc:///image/images/radio-deselected.png"
                            }
                            label: Label {
                                text: rb_eq.text
                                font.pixelSize: 14
                            }
                            //                        indicator: Rectangle {
                            //                            implicitWidth: 16
                            //                            implicitHeight: 16
                            //                            radius: 9
                            //                            border.color: rb_eq.activeFocus ? "darkblue" : "gray"
                            //                            border.width: 1
                            //                            Rectangle {
                            //                                anchors.fill: parent
                            //                                visible: rb_eq.checked
                            //                                color: "blue"//
                            //                                radius: 9
                            //                                anchors.margins: 4
                            //                            }
                            //                        }
                        }
                        onCheckedChanged: {
                            if (row_eq_corrMode.isUpdateView) {
                                return;
                            }
                            if(!rb_eq.focus){
                                rb_eq.focus=true;
                            }
                            if(checked)
                            {
                                switch(index)
                                {
                                case 0:
                                    columnLayout.current_eq_mode="rel";break;
                                case 1:
                                    columnLayout.current_eq_mode="abs";break;
                                case 2:
                                    columnLayout.current_eq_mode="non";break;
                                }
                                Ams.setEqCorrMode(columnLayout.current_eq_mode);
                                if (Ams.getFiltersCorrelationMode() != "non") {
                                    Ams.setFiltersCorrelationMode((Ams.getEqCorrMode() != "non" ? Ams.getEqCorrMode() : "rel"));
                                }
                                if (!Ams.isCorrelationMode()) {
                                    //Ams.disbandAllGroup(); //解散所有路由的所有分组
                                    Ams.disbandAllOutputGroup();
                                    Ams.disbandAllStandardInputGroup();
                                    if (Ams.getCurrentActiveGroupsFlag() === Ams.OUTPUTS_GROUPS) {
                                        row_check.updateCheck((stacks.currentIndex == 0)?io.currentOutput:Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
                                    } else {
                                        ioInputEQ.updateCheck();
                                    }
                                }
                                if (rep_outgrp.isReady) {
                                    rep_outgrp.updateViewOfHalfChecked();
                                }
                            }
                        }
                    }
                }
            }
        }

        DspVolume {
            id:channel_vol
            property var txt: "通道"
            vol_name:qsTr(txt+" ")+qsTr("音量：");
            vol_width:96
            maxLenth:5
            stepSize:0.5
            maxValue:0.0
            minValue: -20.0
            decimals: 1
            isShowPlusSign: true
            inputValidator:DoubleValidator{bottom:-20.0;top:0.0;decimals:1;}
            anchors.left: main_vol.right
            anchors.leftMargin: (settings.lang == "cn")?81:39
            anchors.verticalCenter: parent.verticalCenter
            enableMute: false
            visible: false
            signal updateView();
            //        signal handleData(int cmdIdx, string strRet);
            onVolumeChanged: {
                //                        console.log("onVolumeChanged------------>"+volume)
                var active_output = Ams.getCurrentMaster();
//                if (Ams.isSBOutputChannels(active_output) && Ams.isHasNewFeature()) {
//                    volume = parseFloat(Ams.percentToGain(volume));
//                }
                Ams.setVolume(channel_vol, active_output, volume); //-20dB~0dB
            }
            //        onMuteChanged: {
            //            Ams.setMute(channel_vol, Ams.getCurrentMaster(), mute);
            //        }
            onUpdateView: {
                setViewVolume(0);
                var active_output=Ams.getCurrentMaster();
                var readVol = Ams.getChVolume(active_output);
                var gainRange = Ams.getOutputGainRange();
                var minVol = gainRange.min;
                var maxVol = 5;

                if (Ams.isHasNewFeature()) {
                    if (Ams.isSBOutputChannels(active_output)) {
                        minVol = -20.0; //超重低音最小音量值为-20.0
                        maxVol = gainRange.max;
                        if (readVol < minVol) {
                            readVol = minVol;
                            Ams.setVolume(channel_vol, active_output, readVol);
                        }
                    } else {
                        maxVol = (Ams.getDeviceType() === Ams.GSR1 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.0") >= 0) ? 10 : (gainRange.max > 5 ? 5 : gainRange.max);
                        if (readVol > maxVol) {
                            readVol = maxVol;
                            Ams.setVolume(channel_vol, active_output, readVol);
                        }
                    }
                } else {
                    maxVol = (Ams.getDeviceType() === Ams.GSR1 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.0") >= 0) ? 10 : 0;
                }
                channel_vol.setVolumeRange(minVol, maxVol);
                inputValidator.bottom = minVol;
                inputValidator.top = maxVol;

                //console.log("readVol = " + readVol);
                setViewVolume(readVol);
                //            var readMute = Ams.getMute(active_output);
                //            setViewMute(readMute);
            }
            onOutRangeError: {
                updateView();
            }
            //        onHandleData: {
            //            console.log("ApplicationWindow::DspVolume channel_vol.onHandleData:" + msg);
            //        }
        }

    }

    Settings{
        id: settings
        category: "language"
        property string  lang
        property bool fontBold
        property alias saveFolder: saveFile.folder
        property alias loadFolder: loadFile.savedFolder
        property alias binFolder: fileDialog_upgrade_A2B_board.folder
        property alias saveModeFolder: fileDialog_save_mode.folder
        property alias loadModeFolder: fileDialog_load_mode.folder
    }
    //2d3030

    ZRDownload {
        id: zr_download
        property var callbackOfProgress: null
        property var callbackOfError:null
        property var callbackOfFinished: null

        onProgressPosition: {
            console.log("progress: " + pre);
            if (callbackOfProgress != null) {
                callbackOfProgress(pre);
            }
        }

        onError: {
            //console.log("replyFinished: code = " + code + ", msg = " + msg);
            if (code < 0 && callbackOfError != null) {
                callbackOfError(code, msg);
            }
        }

        onDownloadFinished: {
            console.log("downloadFinished called!");
            if (callbackOfFinished != null) {
                callbackOfFinished();
            }
        }

        function getUrl(fileName) {
            return ("https://www.china-gehang.com.cn/firmware/DSP/PC/" + fileName);
        }

        function getPdFileList() {
            var pdFileListString = zr_download.readA2BPredefinedFileList();
            var pdFileList;
            try {
                pdFileList = JSON.parse(pdFileListString);
            } catch (e) {
                pdFileList = [];
            }

            return pdFileList;
        }

        function getCurrentPdFileInfo(pdFileList) {
            var curPdFileInfo = null;
            if (pdFileList.length > 0) {
                for (var i = 0; i < pdFileList.length; i++) {
                    if (pdFileList[i].DT === Ams.getDeviceType() && pdFileList[i].HW === Ams.readDeviceVersion()) {
                        curPdFileInfo = pdFileList[i];
                        break;
                    }
                }
            }

            return curPdFileInfo;
        }

        function removePdFileInfo(pdFileList, pdFileInfo) {
            if (pdFileInfo != null && pdFileList.length > 0) {
                for (var i = 0; i < pdFileList.length; i++) {
                    if (pdFileList[i].DT === pdFileInfo.DT && pdFileList[i].HW === pdFileInfo.HW) {
                        pdFileList.splice(i, 1);
                        break;
                    }
                }
            }
        }

        function getA2BPredefinedFileName(cloudName) {
            if (cloudName != undefined && cloudName.length > 0) {
                return cloudName;
            } else {
                return (Ams.getDeviceType() + "_A2B_predefined.pd");
            }
        }

        /* 更新A2B预设源信息 */
        function refreshPredefinedData(filePath) {
            try {
                var predefinedDataString = zr_download.readA2BPredefinedData(filePath);
                //console.log("refreshPredefinedData: filePath = " + filePath);
                //console.log("refreshPredefinedData: predefinedDataString = " + predefinedDataString);
                if (predefinedDataString.length > 1) {
                    var predefinedData = JSON.parse(predefinedDataString);
                    var cloudVersion = Ams.getCloudVersionInfo();
                    //console.log("cloudVersion.a2b_predefined_version = " + cloudVersion.a2b_predefined_version);
                    //console.log("predefinedData.version = " + predefinedData.version);
                    if (cloudVersion != null && cloudVersion.a2b_predefined_version != undefined) {
                        if (predefinedData.version != cloudVersion.a2b_predefined_version) {
                            console.log("refreshPredefinedData Error: check version fail!");
                            //zr_download.removeFile(filePath);
                            return false;
                        }
                    }
                    if (predefinedData.predefined != undefined && predefinedData.translate_table != undefined) {
                        Ams.refreshCurrentA2BPredefinedData(predefinedData.version, predefinedData.predefined, predefinedData.model_groups, predefinedData.view_size, predefinedData.translate_table);
                        //console.log("Ams.CurrentA2BPredefinedData = " + JSON.stringify(Ams.CurrentA2BPredefinedData));
                        console.log("refreshPredefinedData: done!");
                        //zr_download.removeFile(filePath);
                        return true;
                    }
                }
            } catch (e) {
                console.log("refreshPredefinedData Error: parse fail!");
                //console.log(e);
            }

            //zr_download.removeFile(filePath);
            console.log("refreshPredefinedData Error: read data fail!");
            return false;
        }

        function callbackOfDownloadA2BPredefinedFileError(code, msg) {
            console.log("callbackOfDownloadA2BPredefinedFileError called!");
//            busyView.show(qsTr("获取音源信息失败！") + qsTr("请重新连接设备再试。"));

//            var cloudVersion = Ams.getCloudVersionInfo();
//            var filePath = zr_download.cachePath + zr_download.getA2BPredefinedFileName(cloudVersion.a2b_predefined_name);
//            zr_download.removeFile(filePath); //移除文件，不保留

            root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
        }

        function callbackOfDownloadA2BPredefinedFileFinished() {
            console.log("callbackOfDownloadA2BPredefinedFileFinished called!");

            var cloudVersion = Ams.getCloudVersionInfo();
            var desA2BPredefinedFileName = zr_download.getA2BPredefinedFileName(cloudVersion.a2b_predefined_name);
            var filePath = zr_download.cachePath + desA2BPredefinedFileName;

            //校验并更新A2B预设源信息
            if (zr_download.checkFileMD5(filePath, cloudVersion.a2b_predefined_md5)) {
                if (zr_download.refreshPredefinedData(filePath)) {
                    var pdFileList = zr_download.getPdFileList();
                    var curPdFileInfo = zr_download.getCurrentPdFileInfo(pdFileList);
                    var isChanged = false;
                    if (curPdFileInfo == null) {
                        curPdFileInfo = {"name": desA2BPredefinedFileName, "md5": cloudVersion.a2b_predefined_md5, "DT": Ams.getDeviceType(), "HW": Ams.readDeviceVersion()};
                        pdFileList.push(curPdFileInfo);
                        isChanged = true;
                    } else if (curPdFileInfo.name !== desA2BPredefinedFileName || curPdFileInfo.md5 !== cloudVersion.a2b_predefined_md5) {
                        curPdFileInfo.name = desA2BPredefinedFileName;
                        curPdFileInfo.md5 = cloudVersion.a2b_predefined_md5;
                        isChanged = true;
                    }

                    if (isChanged) {
                        //console.log("pdFileList: " + JSON.stringify(pdFileList));
                        zr_download.writeA2BPredefinedFileList(JSON.stringify(pdFileList));
                    }

//                    root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
//                } else {
//                    busyView.show(qsTr("解析音源信息失败！") + qsTr("请重新连接设备再试。"));
                }
//            } else {
//                busyView.show(qsTr("校验音源信息失败！") + qsTr("请重新连接设备再试。"));
            }

            //zr_download.removeFile(filePath); //使用后移除文件，不保留

            root.identifyDevice(); //识别固件信息、非升级状态则显示弹窗或进入数据同步
        }

        function getCloudFirmwareFileName(cloudName) {
            if (cloudName != undefined && cloudName.length > 0) {
                return cloudName;
            } else {
                var preName = Ams.getDeviceType() + "_HW" + Ams.readDeviceVersion();
                return (preName + "_firmware.bin");
            }
        }

        function startFirmwareUpgrade() {
            //校验固件版本
            var cloudVersion = Ams.getCloudVersionInfo();
            if (hidIO.getFirmwareDevInfo().lastIndexOf(cloudVersion.firmware_version) < 0) {
                if (dev_state.isIdentified) {
                    busyView.hide();
                    toast.show(qsTr("校验固件版本失败！"));
                } else {
                    busyView.show(qsTr("校验固件版本失败！") + qsTr("请重新连接设备再试。"));
                }
                zr_download.removeDownloadedFirmwareFile(); //清除已下载的固件数据
                return false;
            }

            if (hidIO.isLoadMode()) {
                hidIO.reqLoadFirmware();
            } else {
                Ams.devEnterBootloader(sf);
            }

            return true;
        }

        function downloadFirmwareOrStartUpgrade() {
            var cloudVersion = Ams.getCloudVersionInfo();

            if (cloudVersion != null
                    && cloudVersion.firmware_md5 != undefined && cloudVersion.firmware_md5.length > 0
                    && cloudVersion.firmware_version != undefined && cloudVersion.firmware_version.length > 0) {

                var desFirmwareFileName = zr_download.getCloudFirmwareFileName(cloudVersion.firmware_name);
                console.log("desFirmwareFileName = " + desFirmwareFileName);
                zr_download.url = zr_download.getUrl(desFirmwareFileName);

//                var filePath = /*zr_download.cachePath + */desFirmwareFileName;
//                if (zr_download.checkFileMD5(filePath, cloudVersion.firmware_md5)) {
//                    console.log("checkFileMD5: true!");
//                    zr_download.startFirmwareUpgrade(); //开始升级固件
//                } else {
//                    console.log("checkFileMD5: false!");
                    //busyView.showProgress(qsTr("固件获取中，请勿断开设备..."), 0);
                    busyView.modalShow(qsTr("升级准备中，") + qsTr("请稍候..."));
                    zr_download.callbackOfProgress = null; //zr_download.callbackOfDownloadFirmwareFileProgress;
                    zr_download.callbackOfError = zr_download.callbackOfDownloadFirmwareFileError;
                    zr_download.callbackOfFinished = zr_download.callbackOfDownloadFirmwareFileFinished;
                    zr_download.filePath = ""; //zr_download.cachePath;
                    zr_download.fileName = desFirmwareFileName;
                    zr_download.httpDownload();
                    return; //返回等待下载完成后，回调进入校验等后继处理
//                }
            } else {
                if (hidIO.isLoadMode()) {
                    hidIO.reqLoadFirmware();
                } else {
                    Ams.devEnterBootloader(sf);
                }
            }
        }

//        function callbackOfDownloadFirmwareFileProgress(progress) {
//            busyView.showProgress(qsTr("固件获取中，请勿断开设备..."), progress);
//        }

        function callbackOfDownloadFirmwareFileError(code, msg) {
            if (dev_state.isIdentified) {
                busyView.hide();
                toast.show(qsTr("获取固件失败！"));
            } else {
                busyView.show(qsTr("获取固件失败！") + qsTr("请重新连接设备再试。"));
            }
            zr_download.removeDownloadedFirmwareFile(); //清除已下载的固件数据
        }

        function callbackOfDownloadFirmwareFileFinished() {
            console.log("callbackOfDownloadFirmwareFileFinished called!");

            var cloudVersion = Ams.getCloudVersionInfo();
            var filePath = /*zr_download.cachePath + */zr_download.getCloudFirmwareFileName(cloudVersion.firmware_name);

            //校验固件文件
            if (zr_download.checkFileMD5(filePath, cloudVersion.firmware_md5)) {
                hidIO.setFirmwareData(zr_download.readFileData(filePath)); //设置固件数据
                zr_download.startFirmwareUpgrade(); //开始升级固件
            } else {
                if (dev_state.isIdentified) {
                    busyView.hide();
                    toast.show(qsTr("校验固件失败！"));
                } else {
                    busyView.show(qsTr("校验固件失败！") + qsTr("请重新连接设备再试。"));
                }
                zr_download.removeDownloadedFirmwareFile(filePath); //清除已下载的固件数据
                return;
            }
        }

        function removeDownloadedFirmwareFile(filePath) {
            var cloudVersion = Ams.getCloudVersionInfo();

            if (cloudVersion != null
                    && cloudVersion.firmware_md5 != undefined && cloudVersion.firmware_md5.length > 0
                    && cloudVersion.firmware_version != undefined && cloudVersion.firmware_version.length > 0) {

                if (filePath == null) {
                    filePath = /*zr_download.cachePath + */zr_download.getCloudFirmwareFileName(cloudVersion.firmware_name);
                }
                hidIO.setFirmwareData(""); //清除固件数据
                zr_download.removeFile(filePath);
            }
        }

        function getCloudA2BFirmwareFileName(cloudName) {
            if (cloudName != undefined && cloudName.length > 0) {
                return cloudName;
            } else {
                return (Ams.getDeviceType() + "_A2B_firmware.bin");
            }
        }

        function startA2BFirmwareUpgrade() {
            //校验固件版本
            var cloudVersion = Ams.getCloudVersionInfo();
            var internalA2BVersion = hidIO.readInternalA2BIAPFirmwareVersion(true);
            //console.log("internalA2BVersion = " + internalA2BVersion);
            //console.log("cloudVersion.a2b_firmware_version = " + cloudVersion.a2b_firmware_version);
            var parsedCloudA2BVersion = hidIO.parseA2BIAPFirmwareVersion(cloudVersion.a2b_firmware_version);
            var parsedInternalA2BVersion = hidIO.parseA2BIAPFirmwareVersion(internalA2BVersion);
            if ((parsedCloudA2BVersion.car_type.length > 0 && parsedCloudA2BVersion.car_type != parsedInternalA2BVersion.car_type)
                    || (parsedCloudA2BVersion.software_version.length > 0 && parsedCloudA2BVersion.software_version != parsedInternalA2BVersion.software_version)
                    || (parsedCloudA2BVersion.hardware_version.length > 0 && parsedCloudA2BVersion.hardware_version != parsedInternalA2BVersion.hardware_version)
                    || (parsedCloudA2BVersion.compile_day.length > 0 && parsedCloudA2BVersion.compile_day != parsedInternalA2BVersion.compile_day)) {
                if (dev_state.isIdentified) {
                    busyView.hide();
                    toast.show(qsTr("校验固件版本失败！"));
                } else {
                    busyView.show(qsTr("校验固件版本失败！") + qsTr("请重新连接设备再试。"));
                }
                zr_download.removeDownloadedA2BFirmwareFile(); //清除已下载的A2B固件数据
                return false;
            }

            //fileDialog_upgrade_A2B_board.callback = null;
            if (!fileDialog_upgrade_A2B_board.startUpgradeA2B(true)) {
                zr_download.removeDownloadedA2BFirmwareFile(); //清除已下载的A2B固件数据
                return false;
            }

            return true;
        }

        function downloadA2BFirmwareOrStartUpgrade() {
            var cloudVersion = Ams.getCloudVersionInfo();

            if (cloudVersion != null
                    && cloudVersion.a2b_firmware_md5 != undefined && cloudVersion.a2b_firmware_md5.length > 0
                    && cloudVersion.a2b_firmware_version != undefined && cloudVersion.a2b_firmware_version.length > 0) {

                var desA2BFirmwareFileName = zr_download.getCloudA2BFirmwareFileName(cloudVersion.a2b_firmware_name);
                console.log("desA2BFirmwareFileName = " + desA2BFirmwareFileName);
                zr_download.url = zr_download.getUrl(desA2BFirmwareFileName);

//                var filePath = /*zr_download.cachePath + */desA2BFirmwareFileName;
//                if (zr_download.checkFileMD5(filePath, cloudVersion.a2b_firmware_md5)) {
//                    console.log("checkFileMD5: true!");
//                    zr_download.startA2BFirmwareUpgrade(); //开始升级固件
//                } else {
//                    console.log("checkFileMD5: false!");
                    //busyView.showProgress(qsTr("A2B固件获取中，请勿断开设备..."), 0);
                    busyView.modalShow(qsTr("升级准备中，") + qsTr("请稍候..."));
                    zr_download.callbackOfProgress = null; //zr_download.callbackOfDownloadFirmwareFileProgress;
                    zr_download.callbackOfError = zr_download.callbackOfDownloadA2BFirmwareFileError;
                    zr_download.callbackOfFinished = zr_download.callbackOfDownloadA2BFirmwareFileFinished;
                    zr_download.filePath = ""; //zr_download.cachePath;
                    zr_download.fileName = desA2BFirmwareFileName;
                    zr_download.httpDownload();
                    return; //返回等待下载完成后，回调进入校验等后继处理
//                }
            } else {
                //fileDialog_upgrade_A2B_board.callback = null;
                fileDialog_upgrade_A2B_board.startUpgradeA2B(true);
            }
        }

        function callbackOfDownloadA2BFirmwareFileError(code, msg) {
            if (dev_state.isIdentified) {
                busyView.hide();
                toast.show(qsTr("获取A2B固件失败！"));
            } else {
                busyView.show(qsTr("获取A2B固件失败！") + qsTr("请重新连接设备再试。"));
            }
            zr_download.removeDownloadedA2BFirmwareFile(filePath); //清除已下载的A2B固件数据
        }

        function callbackOfDownloadA2BFirmwareFileFinished() {
            console.log("callbackOfDownloadA2BFirmwareFileFinished called!");

            var cloudVersion = Ams.getCloudVersionInfo();
            var filePath = /*zr_download.cachePath + */zr_download.getCloudA2BFirmwareFileName(cloudVersion.a2b_firmware_name);

            //校验固件文件
            if (zr_download.checkFileMD5(filePath, cloudVersion.a2b_firmware_md5)) {
                hidIO.setSendFileData(zr_download.readFileData(filePath)); //设置固件数据
                zr_download.startA2BFirmwareUpgrade(); //开始升级固件
            } else {
                if (dev_state.isIdentified) {
                    busyView.hide();
                    toast.show(qsTr("校验A2B固件失败！"));
                } else {
                    busyView.show(qsTr("校验A2B固件失败！") + qsTr("请重新连接设备再试。"));
                }
                zr_download.removeDownloadedA2BFirmwareFile(filePath); //清除已下载的A2B固件数据
            }
        }

        function removeDownloadedA2BFirmwareFile(filePath) {
            var cloudVersion = Ams.getCloudVersionInfo();

            if (cloudVersion != null
                    && cloudVersion.a2b_firmware_md5 != undefined && cloudVersion.a2b_firmware_md5.length > 0
                    && cloudVersion.a2b_firmware_version != undefined && cloudVersion.a2b_firmware_version.length > 0) {

                if (filePath == null) {
                    filePath = /*zr_download.cachePath + */zr_download.getCloudA2BFirmwareFileName(cloudVersion.a2b_firmware_name);
                }
                hidIO.setSendFileData(""); //清除固件数据
                zr_download.removeFile(filePath);
            }
        }
    }

    HidIO {
        id: hidIO;
        property int chkPwdCmdIdx: -1;
        property int devTIDSettableCmdIdx: -1;
        property var devTIDList: []
        property int devTIDIdx: -1
        property int typeCmdIdx: -1;
        property int typeCmdIdxOfOldAdaptable1: -1;
        property int typeCmdIdxOfOldAdaptable2: -1;
        property int typeCmdIdxOfAdaptable3: -1;
        property int versionCmdIdx: -1
        property int statusCmdStartIdx: -1
        property int statusCmdIdx: -1
        property int loadCmdIdx: -1;
        property bool isEnd: false;
        property bool isChange: false;
        property string lastestAdaptableDeviceVersion: ""
        property string finallyFirmwareDevInfo: ""
        property var transFileCallback: null
        property var syncCallback: null
        signal handleData(int cmdIdx, string strRet);

        Component.onCompleted: {
            if (Ams.isDebug) {
                toast.show(qsTr("当前为演示模式"));
            } else {
                if (Ams.isForCDT() && !Ams.isForFactoryTest()) {
                    //busyView.modalShow(qsTr("等待设备连接..."));
                    lbTypeChange(""); //未连接
                } else {
                    busyView.modalShow(qsTr("等待设备连接..."));
                    lbTypeChange(qsTr("未连接"));
                }
            }
        }
        onTextMessageReceived: {
            var callback = Ams.getCallback(message);
            if(isEnd){ //非获取信息报文才识别为用户有操作
                if (!isChange &&
                        message.indexOf("::cmd not found") == -1 && /* search()函数是配置正则表达式，可能会有问题，故用indexOf替代 */
                        message.indexOf("::stream_status?") == -1 &&
                        message.indexOf("::current_bt_version?") == -1 &&
                        message.indexOf("::mainvolume?") == -1 &&
                        message.indexOf("::mainmute?") == -1 &&
                        message.indexOf("::can_ctrl_version?") == -1 &&
                        message.indexOf("::upgrade_valid?") == -1 &&
                        message.indexOf("::input_dlc_average_value?") == -1 &&
                        message.indexOf("::a2b_init_correct?") == -1 &&
                        message.indexOf("::ak7735_all_register?") == -1 &&
                        message.indexOf("::a2b_node_init_enable?") == -1 &&
                        message.indexOf("::a2b_router2_status?") == -1 &&
                        !can_ctrl_settings_win.isCanCtrlCallback(callback) /* 过滤方控配置指令 */ &&
                        !modes_pair_win.isModePairsCallback(callback) /* 过滤模式配对指令 */ &&
                        !modes_auto_switch_win.isModeAutoSwitchCallback(callback) /* 过滤模式自动切换指令 */ &&
                        !timer_meter.isMeterCallback(callback) /* 过滤增益检测指令 */ &&
                        !fileDialog_upgrade_A2B_board.isA2BIAPCallback(callback) /* 过滤A2BIAP指令 */ &&
                        !sf.isTransModeCallback(callback) /* 过滤传输模式指令 */ &&
                        !query_can.isQueryCanCallback(callback) /* 过滤获取CAN数据指令 */ &&
                        !car_model_settings_win.isCarModelSettingsCallback(callback) /* 过滤车型选择指令 */) {
                    isChange=true;
                }
            }
            Ams.handleData(callback, message);
            //grahp_frame.updCounts();
        }
        onStatusChanged: {
            if (Ams.isDebug) return;

            if (timer_verify_timeout.need_verify_again) {
                Ams.setVerifyPass(false);
            }

            if (hidIO.status == HidIO.Error) {
                console.error("Error: " + hidIO.errorString);
                switch (errorString) {
                case "hid identify fail":
                    busyView.modalShow(qsTr("设备识别失败，") + qsTr("请连接正确状态的设备。"));
                    break;
                case "hid identify timeout":
                    busyView.modalShow(qsTr("设备识别失败，") + qsTr("请检查连接质量或设备版本。"));
                    break;
                case "hid identify error":
                    busyView.modalShow(qsTr("设备识别失败，") + qsTr("请尝试重新连接设备。"));
                    break;
                default:
                    break;
                }
//            } else if (hidIO.status == HidIO.Connecting) {
//                busyView.modalShow(qsTr("设备识别中，请稍候..."));
            } else if (hidIO.status == HidIO.Open) {
                Ams.saveCloudVersionInfo(null); //清空本地已存储的云端版本信息
                Ams.refreshCurrentA2BPredefinedData("", null, null, null, null); //清空本地已存储A2B预设源配置信息
                hidIO.syncCallback = null;
                if (ioInputEQ.visible) ioInputEQ.backToIOView(); //关闭可能已打开的输入源EQ配置窗口
                dev_state.setConnectState(true, null, false); //指示已连接
                Ams.cleanDeviceVersionInfo();
                if (hidIO.isLoadMode()) {
                    console.log("ready to load firmware");
                    //发送固件下载请求，等待下载状态返回
//                    hidIO.setFirmwarePath(":/firmware.bin");
//                    console.log("device info:" + hidIO.getFirmwareDevInfo());
                    if (hidIO.isLoadModeLocked()) { //模式被锁定，说明是手动操作升级的情况，直接请求下载固件
                        hidIO.reqLoadFirmware();
                    } else { //模式未锁定，还不知道设备型号，主动请求设备信息
                        hidIO.reqLoadDevInfo();
                    }
                } else {
                    Ams.initNet(hidIO);
//                    hidIO.devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO);
                    chkPwdCmdIdx = Ams.devCheckPwd(hidIO, ""); //校验空连接密码获取状态（完成后会调用：devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO)）
                }
                hideCloseDias();

//                hidIO.setFirmwarePath(":/"+"GD16"+"_firmware.bin");
                console.log("hid opened");
            } else if (hidIO.status == HidIO.Closed) {
                Ams.saveLastestDeviceInfo();
                zr_download.removeDownloadedA2BFirmwareFile(); //清除已下载的A2B固件数据
                timer_httpRequestTimeout.abortLastestHandler(); //主动停止网络请求
                qTracert.stopProcess(); //停止追踪
                timer_meter.setMeterEnable(false); //关闭增益检测
                timer_auto_backup_data.stop(); //关闭自动备份
                query_can.reset(); //复位CAN相关缓存、选项等
                if (hidIO.isLoadModeLocked() && hidIO.isLoadMode()) { //被锁定为下载模式时的处理
                    zr_download.removeDownloadedFirmwareFile(); //清除已下载的固件数据
                    if (hidIO.isLoadModeHandle()) { //被断开连接的是下载模式句柄才处理
                        hidIO.setLoadMode(false, false); //解除运行模式锁定，并退出固件下载模式（后续会自动选择连接模式）
                    }
                } else if (Ams.isDevRebootForBootloader()) { //因设备请求进入固件下载模式导致重启而断开
                    Ams.clearEnterBootloaderFlag();
                    hidIO.setLoadMode(true, true); //锁定为固件下载模式
                } else {
                    zr_download.removeDownloadedFirmwareFile(); //清除已下载的固件数据
                }
                if (timer_refresh_stream_info.running) {
                    timer_refresh_stream_info.stop();
                }
                if (timer_refresh_vol_and_mute.running) {
                    timer_refresh_vol_and_mute.stop(); //停止主音量和主静音定时刷新
                }
                if (ioInputEQ.visible) ioInputEQ.backToIOView(); //关闭可能已打开的输入源EQ配置窗口
                io_button.selected = true; //默认选中"输入输出"界面
                dev_state.setConnectState(false, null, false); //指示未连接
                //reset_win.uncheckedAll(); //全不选复位项
                Ams.closeNet();
                if (!Ams.isForCDT() || Ams.isForFactoryTest()) {
                    Ams.cleanDeviceVersionInfo();
                }
                Ams.cleanBTVersion();
                Ams.cleanCanCtrlVersion();
                if (Ams.isForCDT() && !Ams.isForFactoryTest()) {
                    busyView.closeAllDialog();
                    busyView.hide();
                    if (!Ams.isDemoMode()) {
                        toast.show(qsTr("设备已断开，等待连接..."));
                    }
                } else {
                    busyView.modalShow(qsTr("设备已断开，等待连接..."));
                }
                console.log("hid closed");

                //bar_rca_or_amp.currentIndex = 0;
                if (Ams.isForCDT() && !Ams.isForFactoryTest()) {
                    lbTypeChange("");
                } else {
                    //Ams.resetAllDB();
                    if (Ams.getUniversalOutputsLength() == 0) {
                        Ams.setCurrentOutputsTypeGroup(Ams.AMP_OUTPUTS_GROUP_1);
                    }
                    configDsp(false);
                    lbTypeChange(qsTr("未连接"));
                }
                loadFileR();
                closeDia();
                isEnd=false;
                Ams.setDemoModeEnabled(true);
                if(isChange){
                    isChange=false;
                    showCloseDias(qsTr("警告"),qsTr("设备已移除，数据可能没保存！"),2);
                }
                //                        hidIO.active=false;
            }
            console.log("onStatusChanged:" + hidIO.status);
        }
        onLoadStatusChanged: {
            if (timer_verify_timeout.need_verify_again) {
                Ams.setVerifyPass(false);
            }

            console.log("onLoadStatusChanged:" + loadStatus + ", msg: " + hidIO.loadErrorString);

            if (Ams.isForFactoryTest() || (Ams.isDebug || Ams.isDemoMode())) {
                return; //工厂测试专用版或演示状态不允许升级固件
            }

            switch (loadStatus) {
            case HidIO.LoadDevInfo:
                console.log("onLoadStatusChanged 'HidIO.LoadDevInfo' devInfoString:" + hidIO.devInfoString);
                //根据信息设置设备类型、固件路径并发送固件下载请求
                //for continue...
                var res=hidIO.devInfoString.split(",");
                if (res[0] == Ams.A2B16 || res[0] == Ams.AB216) {
                    res[0] = Ams.AB216_D9;
                } else {
                    if (res[0] === Ams.AB218_TANK) {
                        res[0] = Ams.AB218;
                    }
                }
                Ams.saveDeviceInfo(res[0],res[1],res[2],res[3],res[4],res[5]);

                root.startGetVersionInfo();
                break;
            case HidIO.LoadAccepted:
                console.log("onLoadStatusChanged 'HidIO.LoadAccepted' devInfoString:" + hidIO.devInfoString);
//                if (hidIO.isLoadModeLocked()) {
//                    console.log("manual selected load mode");
//                    GD16,,1.0.0,,1.0.0,10256
                    //手动进入固件升级模式的设备，需要判断是否满足升级条件，满足则不提示直接升级，否则要提示错误信息
                    var type=hidIO.devInfoString.split(",");
                    if (type[0] == Ams.A2B16 || type[0] == Ams.AB216) {
                        type[0] = Ams.AB216_D9;
                    } else {
                        if (type[0] === Ams.AB218_TANK) {
                            type[0] = Ams.AB218;
                        }
                    }
                    var deviceType = type[0];//设备型号
                    console.log("-hidIO.devInfoString--->"+deviceType+","+type[2]+","+type[4]+","+type[5]);
                    var firmWare=hidIO.getFirmwareDevInfo();
                    console.log("--->"+firmWare)
                    var splitFrimWare=firmWare.split(',');
                    var deviceTypePc=splitFrimWare[0];
                  console.log("-hidIO.getFirmwareDevInfo--->"+deviceTypePc+","+splitFrimWare[2]+","+splitFrimWare[4]+","+splitFrimWare[5]);
                    if(deviceTypePc!=deviceType|| /*硬件版本*/(Ams.versionCmp(type[2], splitFrimWare[2]) != 0 && Ams.versionCmp(hidIO.lastestAdaptableDeviceVersion, splitFrimWare[2]) != 0) || /*固件构建版本*/parseInt(type[5]) > parseInt(splitFrimWare[5])) {
                        if (deviceTypePc!=deviceType) {
                            busyView.show(qsTr("固件升级失败")+qsTr("，设备型号不一致。"))
                        } else if (Ams.versionCmp(type[2], splitFrimWare[2]) != 0 && Ams.versionCmp(hidIO.lastestAdaptableDeviceVersion, splitFrimWare[2]) != 0) {
                            busyView.show(qsTr("固件升级失败")+qsTr("，设备硬件版本不一致。"))
                        } else if (parseInt(type[5]) > parseInt(splitFrimWare[5])) {
                            busyView.show(qsTr("固件升级失败")+qsTr("，设备固件版本不一致。"))
                        } else {
                            busyView.show(qsTr("固件升级失败")+qsTr("，请重启设备再试。"))
                        }
                        break;
                    }
//                }
                hidIO.startLoadFirmware(); //开始下载固件
                break;
            case HidIO.LoadStart:
                break;
            case HidIO.LoadDone:
                Ams.setLastestFirmwareLoadDone(true);
                zr_download.removeDownloadedFirmwareFile(); //清除已下载的固件数据
                busyView.show(qsTr("固件升级完成")+qsTr("，重启设备..."));
                hidIO.rebootDevice(); //重启设备
                break;
            case HidIO.Rebooted:
                if (Ams.isNeedResetConfigAfterLastestUpgrade()) {
                    busyView.show(qsTr("请勿断电！") + qsTr("等待连接..."));
                } else {
                    busyView.show(qsTr("固件升级完成")+qsTr("，等待连接..."));
                }
                break;
            case HidIO.LoadError:
                zr_download.removeDownloadedFirmwareFile(); //清除已下载的固件数据
                busyView.show(qsTr("固件升级失败")+qsTr("，请重启设备再试。"));
                break;
            default:
                break;
            }
        }
        onLoadProgressChanged: {
//            console.log("onLoadProgressChanged:" + loadedSize + ", " + firmwareSize);
            busyView.showProgress(qsTr("固件升级中，请勿断开设备..."), parseInt(loadedSize * 100 / firmwareSize));
        }

        onTransStatusChanged: {
            if (transFileCallback != null) {
                transFileCallback.transStatusChanged(errorCode);
            }
        }

        onTransProgressChanged: {
//            console.log("onTransProgressChanged:" + dealedSize + ", " + totalSize);
            if (transFileCallback != null) {
                transFileCallback.transProgressChanged(dealedSize, totalSize);
            }
        }

        onHidModeChanged: {
            if (isLoadMode) {
                console.log("onHidModeChanged:" + hidIO.isLoadMode);
            }
        }
        onHandleData: {
            //console.log("default handleData reuslt:" + strRet);
            if (cmdIdx == chkPwdCmdIdx) {
                chkPwdCmdIdx = -1; //重置命令索引，以免索引循环导致的异常进入
//                console.log("handleData: cmdIdx = " + cmdIdx + ", strRet:" + strRet);
                switch (strRet) {
                case "ok":
                case "empty":
                case "cmd not found": //兼容旧版本固件
                    Ams.setPwdCheckedState(strRet==="empty"?2:1);
                    break;
                case "error":
                    Ams.setPwdCheckedState(-1);
                    break;
                case "fail":
                    Ams.setPwdCheckedState(0);
                    break;
                default:
                    Ams.setPwdCheckedState(0);
                    break;
                }
                hidIO.devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO);
            } else if (cmdIdx == devTIDSettableCmdIdx) {
                devTIDSettableCmdIdx = -1; //重置命令索引，以免索引循环导致的异常进入
                devTIDList = Ams.getAdaptableDevTIDList();
                if (devTIDList.length > 0) {
                    if (strRet == "cmd not found" && devTIDList.length > 1) { //返回"cmd not found"说明是未增加设置标识功能的固件版本
                        devTIDIdx = 1;
                    } else {
                        devTIDIdx = 0;
                    }
                    typeCmdIdx = Ams.devType(hidIO, devTIDList[devTIDIdx]);
                } else {
                    devTIDList = [];
                    devTIDIdx = -1;
                    busyView.modalShow(qsTr("设备识别失败，") + qsTr("请使用匹配的调音软件！"));
                }
            } else if (cmdIdx == typeCmdIdx) {
                typeCmdIdx = -1; //重置命令索引，以免索引循环导致的异常进入
                if (strRet.length > 0) {
                    if (strRet == "pwd check fail") {
                        passwd_check_frame.modalShow();
                    } else {
                        dev_state.setConnectState(true, strRet, false); //尝试指示已连接（如果报文格式错误会指示识别失败）
                    }
                } else {
                    if (devTIDList.length > 0 && devTIDIdx < devTIDList.length - 1) {
                        devTIDIdx++;
                        typeCmdIdx = Ams.devType(hidIO, devTIDList[devTIDIdx]);
                    } else {
                        devTIDList = [];
                        devTIDIdx = -1;
                        typeCmdIdxOfOldAdaptable1 = Ams.devTypeOldAdaptable1(hidIO);
                    }
                }
            } else if (cmdIdx == typeCmdIdxOfOldAdaptable1) {
                typeCmdIdxOfOldAdaptable1 = -1; //重置命令索引，以免索引循环导致的异常进入
                if (strRet.length > 0) {
                    if (strRet == "pwd check fail") {
                        passwd_check_frame.modalShow();
                    } else {
                        dev_state.setConnectState(true, strRet, true); //尝试指示已连接（如果报文格式错误会指示识别失败）
                    }
                } else {
                    typeCmdIdxOfOldAdaptable2 = Ams.devTypeOldAdaptable2(hidIO);
                }
            } else if (cmdIdx == typeCmdIdxOfOldAdaptable2) {
                typeCmdIdxOfOldAdaptable2 = -1; //重置命令索引，以免索引循环导致的异常进入
                if (strRet.length > 0) {
                    if (strRet == "pwd check fail") {
                        passwd_check_frame.modalShow();
                    } else {
                        if (Ams.isForIndonesia()) {
                            if (strRet.indexOf("0A10000022390A8132") != -1) { //对印尼版一台设备标识为"歌航"的A10的特殊处理
                                dev_state.setConnectState(true, strRet, false); //尝试指示已连接（如果报文格式错误会指示识别失败）
                            } else {
                                busyView.modalShow(qsTr("设备识别失败，") + qsTr("请使用匹配的调音软件！"));
                            }
                        } else {
                            dev_state.setConnectState(true, strRet, true); //尝试指示已连接（如果报文格式错误会指示识别失败）
                        }
                    }
                } else {
                    typeCmdIdxOfAdaptable3 = Ams.devTypeAdaptable3(hidIO);
                }
            } else if (cmdIdx == typeCmdIdxOfAdaptable3) {
                typeCmdIdxOfAdaptable3 = -1; //重置命令索引，以免索引循环导致的异常进入
                if (strRet.length > 0) {
                    if (strRet == "pwd check fail") {
                        passwd_check_frame.modalShow();
                    } else {
                        var res=strRet.split(',');
                        if (Ams.isForIndonesia() && Ams.isInNewSpecialDealDeviceListForIndonesia(res[1])) { //对印尼版50台设备标识为"歌航国际版"的GDT08的特殊处理
                            dev_state.setConnectState(true, strRet, false); //尝试指示已连接（如果报文格式错误会指示识别失败）
                        } else {
                            busyView.modalShow(qsTr("设备识别失败，") + qsTr("请使用匹配的调音软件！"));
                        }
                    }
                } else {
                    busyView.modalShow(qsTr("设备识别失败，") + qsTr("请使用匹配的调音软件！"));
                }
            } else {
                Ams.loadCurConfigModeRespParse(strRet); //解析当前接收到的报文并解析一条配置项存至数据库
                if (cmdIdx == versionCmdIdx) {
                    versionCmdIdx = -1; //重置命令索引，以免索引循环导致的异常进入

                    //获取云端设备固件、A2B固件等的版本信息
                    root.startGetVersionInfo(Ams.isNeedVerifyDevice() ? undefined : 2000); //不需要设备验证时仅设置2秒超时
                } else if (cmdIdx == statusCmdIdx) {
                    statusCmdIdx = -1; //重置命令索引，以免索引循环导致的异常进入

                    if (strRet == "pwd check fail") {
                        //passwd_check_frame.modalShow();
                        return;
                    } else {
                        if (Ams.isHasA2BRoute()) {
                            if (Ams.getA2BIAPStatus() === 1) {
                                msgBox_universal.callbackHandler = startGetDeviceStatus;
                                msgBox_A2BIAPStatus.showDiasi("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级"), "A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级失败！") + qsTr("按确认重试。"), StandardIcon.Warning);
                                return;
                            }
                        }

                        msgBox_universal.callbackHandler = null;
                    }

                    if (Ams.isLastestDeviceChanged()) { //设备有变化才重置数据库
                        Ams.resetAllDB();
                    }

                    if (Ams.isNeedVerifyDevice()) {
                        if (Ams.isVerifyPass()) {
                            hidIO.syncData();
                        } else {
                            Ams.loadConfigModeReq(hidIO);
                            loadCmdIdx = Ams.loadCurConfigModeReq(hidIO);
                        }
                    } else {
                        if (Ams.isNeedReportDevice()) {
                            root.startGetIP(); //开启仅获取IP流程
                        }
                        hidIO.syncData();
                    }
                } else if (cmdIdx == loadCmdIdx) {
                    loadCmdIdx = -1; //重置命令索引，以免索引循环导致的异常进入

                    if (strRet == "pwd check fail") {
                        //passwd_check_frame.modalShow();
                        return;
                    }

                    //动态配置
                    if (Ams.isHasA2BRoute()) {
                        Ams.adaptCarModelA2BPredefinedData(); //适配当前车型的A2B预设源配置
                        car_model_settings_win.refreshModel(); //更新当前车型分组及车型列表
                    }
                    if (Ams.getUniversalOutputsLength() == 0) {
                        Ams.setCurrentOutputsTypeGroup(Ams.AMP_OUTPUTS_GROUP_1);
                    }
                    if (Ams.isForCDT() && !Ams.isForFactoryTest()) {
                        configDsp(false); //调用以避免上次断开设备后部分控件状态没重置
                    }
                    configDsp(true);
                    sf.updateView(-1); //刷新“关于”界面（要在configDsp(true)后调用，否则不显示主车型名称）
                    io.updateTabOfAnalogHighInputs();
                    io.updateTabOfA2BInputs();
                    specialVersionDeal();
                    Ams.checkRepairDataBase(); //同步后使数据库格式保持在最新版本上
                    Ams.checkResetGroup(); //同步后重置没有源的输出通道分组
                    Ams.checkRepairInputsGroup(); //假设为切换型号，需重置所有基础输入源的默认分组下标
                    Ams.checkRepairInputSources(); //同步后使输入源排序规范化
                    Ams.checkRepairCurrentMaster(); //同步后要使主通道值保持在有输入源的通道上
                    grahp_frame.rePaintAllGraph(); //同步完成后重绘“主界面”所有图形
                    ioInputEQ.rePaintAllGraph(); //同步完成后重绘输入源EQ所有图形
                    //grahp_frame.resCounts();
                    isEnd=true;
                    console.log("----------------------Sync done!----------------------");
                    if (io.currentOutput >= Ams.getOutputsLength()) { //输出下标超出当前设备最大输出下标的情况
                        io.currentOutput = Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster());
                    }
                    io_button.selected = true; //默认选中"输入输出"界面
                    root.updateView(); //刷新大部分界面内容
                    //io.refreshAllInputDLCGraphData(); //刷新所有输入通道动态等响度调节(DLC)图形数据

                    invalidCaches();
                    //redoLayout();
                    doCalcMargin();
                    io.doCalcMargin();

                    if (Ams.isVSRxSeriesDevice()) {
                        timer_refresh_vol_and_mute.start(); //开启主音量和主静音定时刷新
                    }

                    modes_button.txt = qsTr("模式") + ((Ams.getActiveConfigMode() > -1)?(" " + (Ams.getActiveConfigMode() + 1)):""); //刷新模式按钮文本

                    dcb_type.updateView();

                    if (!Ams.isNeedVerifyDevice() || Ams.isVerifyPass()) {
                        afterSyncDeal();
                    } else {
                        hidIO.syncCallback = afterSyncDeal;
                    }
                } else if (cmdIdx == statusCmdStartIdx) {
                    //Ams.printCurrentTime();
                    //console.log("statusCmdStartIdx = " + statusCmdStartIdx);
                    statusCmdStartIdx = -1;

                    if (strRet == "pwd check fail") {
                        passwd_check_frame.modalShow();
                        return;
                    }
                }
            }
        }

        function startGetDeviceStatus() {
            busyView.show(qsTr("请稍候..."));
            hidIO.statusCmdIdx = Ams.getDeviceStatusReq(hidIO, hidIO.setStatusCmdStartIdx);
        }

        function setStatusCmdStartIdx(idx) {
            statusCmdStartIdx = idx;
        }

        function afterSyncDeal() {
            dev_state.isIdentified = true; //标识为已识别设备
            busyView.hide(); //已接收完最后一条配置项，解除忙碌状态
            remaindUpgrade(); //部分情况下主动弹出提醒升级
            timer_auto_backup_data.start(); //开启自动备份

            if (Ams.isHasA2BRoute()) {
                if (Ams.getA2BInitCorrect() === 0) {
                    msgBox_universal.showDias(qsTr("车型初始化"), qsTr("车型初始化失败！") + ("(" + qsTr("车型代码：") + Ams.getA2BInitCorrectInfo() + ")"));
                    return;
                }
            }

            //todo 获取网络版
//                    getVer(Ams.getDeviceType());
//                    getVer("GD16");
            //todo
        }

        /* 获取新固件中的设备信息串，格式：设备型号,设备序列号,硬件版本,线控板版本(线控板构建版本),固件版本,固件构建版本*/
        function getFirmwareDevInfo() {
            var cloudVersion = Ams.getCloudVersionInfo();
            if (cloudVersion != null
                    && cloudVersion.firmware_md5 != undefined && cloudVersion.firmware_md5.length > 0
                    && cloudVersion.firmware_version != undefined && cloudVersion.firmware_version.length > 0) {

                //校验固件文件
                var filePath = /*zr_download.cachePath + */zr_download.getCloudFirmwareFileName(cloudVersion.firmware_name);
                if (!zr_download.checkFileMD5(filePath, cloudVersion.firmware_md5)) { //校验失败则使用云端版本信息
                    console.log("getFirmwareDevInfo: " + (Ams.getDeviceType() + ",," + Ams.readDeviceVersion() + ",," + cloudVersion.firmware_version));
                    return (Ams.getDeviceType() + ",," + Ams.readDeviceVersion() + ",," + cloudVersion.firmware_version);
                }
            }

            return hidIO.readFirmwareDevInfo();
        }

        function setFinallyFirmwareDevInfo(strInfo) {
            hidIO.finallyFirmwareDevInfo = strInfo;
        }

        function readFinallyFirmwareDevInfo() {
            return hidIO.finallyFirmwareDevInfo;
        }

        function requestVerify(IP, tracert1Result, tracert2Result, routePrintResult, ipconfigResult) {
            //busyView.show(qsTr("正在进行设备验证，请保持网络畅通...")/* + "."*/);
            //console.log();
            //Ams.printCurrentTime();
            //console.log(">>>>>>>>>>>>>>>>Step5: Request verify...");
            root.requestFromMyServer("verifyV2",
                                     "softwareVersion=" + Ams.softCurVer +
                                     "&softwareBuild=" + Ams.softCurCode +
                                     (root.getDeviceSNForVerify().length > 0 ? ("&deviceNo=" + root.getDeviceSNForVerify()) : "") +
                                     "&deviceType=" + Ams.getDeviceType() +
                                     "&deviceVersion=" + Ams.readDeviceVersion() +
                                     //(Ams.isNeedGetBluetoothVersion() && Ams.readBTVersion().length > 0 ? ("&bluetoothVersion=" + Ams.readBTVersion()) : "") +
                                     "&firmwareVersion=" + Ams.readFirmwareVersion() +
                                     "&firmwareBuild=" + Ams.getFirmwareCode() +
                                     (Ams.controlVersion.length > 0 ? ("&controlVersion=" + Ams.controlVersion) : "") +
                                     (Ams.isNeedVerifyDevice() ? "" : "&report=true") +
                                     (IP.length > 0 ? ("&IP=" + IP) : "") +
                                     (tracert1Result.length > 0 ? ("&tracert1=" + tracert1Result) : "") +
                                     (tracert2Result.length > 0 ? ("&tracert2=" + tracert2Result) : "") +
                                     (routePrintResult.length > 0 ? ("&routePrint=" + routePrintResult) : "") +
                                     (ipconfigResult.length > 0 ? ("&ipconfig=" + ipconfigResult) : ""), callbackOfVerify); //设备验证
        }

        function callbackOfVerify(responseText, status, isRequestAborted) {
            //console.log("callbackOfVerify Response: " + responseText);
            if (status === 0) {
                timer_main.isLastestRequestFailed = true;
                if (isRequestAborted) {
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接超时，请检查网络是否畅通...")/* + "."*/);
                    }
                } else {
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.show(qsTr("网络连接失败，请检查网络是否畅通...")/* + "."*/);
                    }
                }
                root.startGetIP(); //重启获取IP流程
                return;
            }
            try {
                var responseJSON = JSON.parse(responseText);
                if (responseJSON.result != null) {
                    if (responseJSON.deviceNo == null || responseJSON.result.indexOf("missing ") === 0) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        return;
                    } else if (responseJSON.deviceNo !== root.getDeviceSNForVerify()) {
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备序列号不匹配！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        return;
                    }

                    switch (responseJSON.result) {
                    case "VALIDATE_OK": //验证通过
                        if (Ams.isNeedVerifyDevice()) {
                            Ams.setVerifyPass(true);
                            if (responseJSON.Timeout != null) {
                                timer_verify_timeout.interval = parseInt(responseJSON.Timeout) * 60 * 1000; //获取的是以分钟为单位的整数
                            }
                            timer_verify_timeout.start();
                            if (hidIO.syncCallback != null) {
                                hidIO.syncCallback();
                                hidIO.syncCallback = null;
                            } else {
                                if (!passwd_check_frame.visible) {
                                    busyView.modalShow(qsTr("同步设备配置，请稍候..."));
                                }
                            }
                        }
                        break;
                    case "nonExist": //设备不存在
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备未注册！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        break;
//                    case "WrongAddress": //该经销商所在地与当前IP地址不符
//                        busyView.modalShow(qsTr("设备不允许在当前地址使用！"));
//                        break;
//                    case "WrongSeller": //设备不在该经销商销售列表中，需要特殊验证
//                        busyView.modalShow(qsTr("设备不存在！"));
//                        break;
//                    case "BLACKLIST": //设备在黑名单中
//                        busyView.modalShow(qsTr("设备不允许连接！"));
//                        break;
                    case "netError": //执行Tracert时无网络
                    case "netRetry": //执行Tracert时网络不稳，需要重试
                        root.startGetIP(); //重启获取IP流程
                        break;
//                    case "InvalidSoftwareVersion": //PC端版本非法
//                    case "fail": //其他问题
//                    case "refuse": //拒绝
                    default:
                        if (Ams.isNeedVerifyDevice()) {
                            busyView.modalShow(qsTr("设备验证未通过！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                        }
                        break;
                    }
                } else {
                    //console.log("callbackOfVerify Error: responseText = " + responseText);
                    if (Ams.isNeedVerifyDevice()) {
                        busyView.modalShow(qsTr("设备验证失败！") + (responseJSON.errorCode != null ? ("(" + qsTr("错误码：") + responseJSON.errorCode + ")") : "") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                    }
                }
            } catch (e) {
                //console.log("callbackOfVerify Error: Call JSON.parse(...) fail, responseText = " + responseText);
                if (Ams.isNeedVerifyDevice()) {
                    busyView.modalShow(qsTr("设备验证失败！") + "\n[" + qsTr("序列号：") + root.getRemapDeviceSN() + "]");
                }
            }
        }

        function syncData(){
            if (dev_state.isConnected) {
                if (Ams.isDebug) {
                    return;
                }
                if (Ams.getPwdCheckedState() < 1) {
                    passwd_check_frame.modalShow();
                } else {
                    busyView.modalShow(qsTr("同步设备配置，请稍候..."));
                    Ams.loadConfigModeReq(hidIO);
                    loadCmdIdx = Ams.loadCurConfigModeReq(hidIO);
//                    busyView.hide();
                }
            } else {
                //busyView.modalShow(qsTr("设备识别失败"));
                busyView.modalShow(dev_state.err);
            }
        }

        function getInternalA2BIAPFirmwarePath() {
            var filePath = "";

            var cloudVersion = Ams.getCloudVersionInfo();
            if (cloudVersion != null
                    && cloudVersion.a2b_firmware_md5 != undefined && cloudVersion.a2b_firmware_md5.length > 0
                    && cloudVersion.a2b_firmware_version != undefined && cloudVersion.a2b_firmware_version.length > 0) {

                filePath = /*zr_download.cachePath + */zr_download.getCloudA2BFirmwareFileName(cloudVersion.a2b_firmware_name);
            } else {
                switch (Ams.getDeviceType()) {
                case Ams.AB212:
                    filePath =  ":/AB212_A2B_firmware.bin";
                    break;
                case Ams.AB216_D9:
                    if (Ams.A2BMainModelID == 2) { //主车型为"腾势D9"
                        filePath =  ":/AB216-D9_A2B_firmware.bin";
                    } else {
                        filePath =  ":/AB216-D9_U_A2B_firmware.bin";
                    }
                    break;
                case Ams.AB216_M9:
                    filePath =  ":/AB216-M9_A2B_firmware.bin";
                    break;
                case Ams.AB216_U:
                case Ams.AB218:
                    if (Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readDeviceVersion(), "1.3.x") >= 0) {
                        filePath =  ":/AB218_HW1.3.0_A2B_firmware.bin";
                    } else {
                        filePath =  ":/AB218_A2B_firmware.bin";
                    }
                    break;
                case Ams.AB218_TANK:
                    filePath =  ":/AB218TK_A2B_firmware.bin";
                    break;
                }
            }

            return filePath;
        }

        function parseA2BIAPFirmwareVersion(versionString) {
            var result = {"car_type": "", "software_version": "", "hardware_version": "", "compile_day": ""};
            if (versionString == null || versionString.length < 1) {
                return result;
            }

            var stringlist = versionString.split("-");
            if (stringlist.length > 3) {
                result.car_type = stringlist[0];
                result.software_version = stringlist[1];
                result.hardware_version = stringlist[2];
                result.compile_day = stringlist[3];
            } else if (stringlist.length > 2) {
                result.software_version = stringlist[0];
                result.hardware_version = stringlist[1];
                result.compile_day = stringlist[2];
            } else if (stringlist.length > 1) {
                result.software_version = stringlist[0];
                result.compile_day = stringlist[1];
            } else if (stringlist.length > 0) {
                result.compile_day = stringlist[0];
            }

            //console.log("parseA2BIAPFirmwareVersion: result = " + JSON.stringify(result));
            return result;
        }

        function readInternalA2BIAPFirmwareVersion(isForceToReadLocal) {
            var resultString = "";

            if (Ams.isHasA2BRoute()) {
                var cloudVersion = Ams.getCloudVersionInfo();
                if (!isForceToReadLocal && cloudVersion != null
                        && cloudVersion.a2b_firmware_md5 != undefined && cloudVersion.a2b_firmware_md5.length > 0
                        && cloudVersion.a2b_firmware_version != undefined && cloudVersion.a2b_firmware_version.length > 0) {

                    //校验固件文件
                    var filePath = /*zr_download.cachePath + */zr_download.getCloudA2BFirmwareFileName(cloudVersion.a2b_firmware_name);
                    if (!zr_download.checkFileMD5(filePath, cloudVersion.a2b_firmware_md5)) { //校验失败则使用云端版本信息
                        resultString = cloudVersion.a2b_firmware_version;
                        //console.log("readInternalA2BIAPFirmwareVersion: resultString = " + resultString + ", isForceToReadLocal = " + isForceToReadLocal);
                        return resultString;
                    }
                }

                hidIO.setSendFilePath(getInternalA2BIAPFirmwarePath());

                if (!hidIO.readAndCheckSendFileA2BIAPInfo()) {
                    hidIO.setSendFilePath("");
                    return resultString;
                }
                resultString = hidIO.readSendFileA2BIAPFirmwareVersionString();

                hidIO.setSendFilePath("");
                //console.log("readInternalA2BIAPFirmwareVersion: resultString = " + resultString + ", isForceToReadLocal = " + isForceToReadLocal);
                //return resultString;
            }

            return resultString;
        }

        function readInternalA2BIAPFirmwareCarType() {
            if (Ams.isHasA2BRoute()) {
                var result = -1;

                hidIO.setSendFilePath(getInternalA2BIAPFirmwarePath());
                if (!hidIO.readAndCheckSendFileA2BIAPInfo()) {
                    return result;
                }
                result = hidIO.readSendFileA2BIAPFirmwareCarType();

                hidIO.setSendFilePath("");
                //console.log("readInternalA2BIAPFirmwareCarType: result = " + result);
                return result;
            }
        }
    }

    onNoNeedIP: {
        hidIO.requestVerify("", "", "", "", ""); //设备验证
    }

    onGotIP: {
        if (qTracert.isNeedAnyTracert) {
            //console.log();
            //Ams.printCurrentTime();
            //console.log(">>>>>>>>>>>>>>>>Step4: Tracert...");
            qTracert.startTracert(IP); //开始路由跟踪
        } else {
            if (Ams.isDeviceInfoSaved()) {
                hidIO.requestVerify(IP, "", "", "", ""); //设备验证
            }
        }
    }

    function adaptOutputRowWidthAndSpacing() {
        if (Ams.getOutputsLength() < 11) {
            rep_outgrp.boxWidth = io.dropTileWidth = 94;
            row_check.spacing  = io.dropRowSpacing = 20;
        } else if (Ams.getOutputsLength() < 13) {
            rep_outgrp.boxWidth = io.dropTileWidth = 80;
            row_check.spacing  = io.dropRowSpacing = 15;
        } else if (Ams.getOutputsLength() < 15) {
            rep_outgrp.boxWidth = io.dropTileWidth = 72;
            row_check.spacing  = io.dropRowSpacing = 11;
        } else /*if (Ams.getOutputsLength() < 17)*/ {
            rep_outgrp.boxWidth = io.dropTileWidth = 66;
            row_check.spacing  = io.dropRowSpacing = 6;
//        } else {
//            rep_outgrp.boxWidth = io.dropTileWidth = 48;
//            row_check.spacing  = io.dropRowSpacing = 1;
        }
    }

    function configDsp(isConnect){
        //动态配置
        initArray(isConnect ? Ams.getOutputsLength() : 0, output_alias.length);
        io.setView(Ams.getDeviceType(), isConnect);
        adaptOutputRowWidthAndSpacing();
        if(isConnect){
            bar_rca_or_amp.showTabBar = (Ams.getIndepAmpOutputsLength() > 0 ? (Ams.getUniversalOutputsLength() > 0 ? true : Ams.getIndepAmpOutputsLength() > 16) : false);
            bar_rca_or_amp.showGroupOfRCA = (Ams.getUniversalOutputsLength() > 0 ? true : false);
            bar_rca_or_amp.splitGroupOfAMP = (Ams.getIndepAmpOutputsLength() > (16 - Ams.getSharedChannelsLength()) ? true : false);
            bar_routings.isDARoutingMixed = Ams.isDARoutingMixed();
            bar_routings.isHasDigitalRoute = Ams.isHasDigitalRoute();
            tb_dr.visible=/*bar_routings.visible && */Ams.isHasDigitalRoute() && !bar_routings.isDARoutingMixed;
            tb_br.visible=/*bar_routings.visible && */Ams.isHasBluetoothModule();
//            modes_button.visible=false;
            modes_win.changeModeCount(Ams.getModeCount())
            out_alias.setHasSurroundAlias(Ams.isHasSurroundAlias());
            out_alias.setHasRearAndStarrySurroundAlias(Ams.isHasRearAndStarrySurroundAlias());
            out_alias.setHasSkyAndSoundAndPillowAlias(Ams.isHasSkyAndSoundAndPillowAlias());
            out_alias.setHasHighLowAlias(Ams.isHasHighLowAlias());
            out_alias.setHasSuperHighAlias(Ams.isHasSuperHighAlias());
            if(Ams.isHasDigitalRoute() && !bar_routings.isDARoutingMixed){
                if( bar_routings.currentIndex!=Ams.DIGITAL){
                    bar_routings.updateView(Ams.DIGITAL);
                }
            }
            else{
                bar_routings.updateView(Ams.ANALOG);
            }

            if (Ams.isHasOutputBridgeJointModule() && Ams.getCurrentOutputsTypeGroup() < Ams.AMP_OUTPUTS_GROUP_2) {
                item_bridge_joint_gh.isVisible = (Ams.getDeviceType() === Ams.R408 || Ams.getDeviceType() == Ams.R210 || (Ams.getDeviceType() == Ams.AB212 && (Ams.getUniversalOutputsLength() > 0 && Ams.getCurrentOutputsTypeGroup() < Ams.AMP_OUTPUTS_GROUP_1)));
                item_bridge_joint_ij.isVisible = (Ams.getDeviceType() != Ams.R408 && Ams.getDeviceType() != Ams.R210 && Ams.getDeviceType() != Ams.R336);
                item_bridge_joint_kl.isVisible = (Ams.getDeviceType() == Ams.GDT216 || Ams.getDeviceType() == Ams.R216 || Ams.getDeviceType() == Ams.R316 || Ams.getDeviceType() == Ams.AB216_D9 || Ams.getDeviceType() == Ams.AB216_M9 || Ams.getDeviceType() == Ams.AB216_U || (Ams.getDeviceType() == Ams.AB212 && (Ams.getUniversalOutputsLength() == 0 || Ams.getCurrentOutputsTypeGroup() >= Ams.AMP_OUTPUTS_GROUP_1)) || Ams.getDeviceType() == Ams.AB218 || Ams.getDeviceType() == Ams.AB218_TANK);
                item_bridge_joint_mn.isVisible = Ams.getDeviceType() == Ams.R336;
                item_bridge_joint_op.isVisible = Ams.getDeviceType() == Ams.R336;
                item_bridge_joint_mp.isVisible = (Ams.getDeviceType() == Ams.R316 || Ams.getDeviceType() == Ams.AB218 || Ams.getDeviceType() == Ams.AB218_TANK);
            } else {
                item_bridge_joint_gh.isVisible = false;
                item_bridge_joint_ij.isVisible = false;
                item_bridge_joint_kl.isVisible = false;
                item_bridge_joint_mn.isVisible = false;
                item_bridge_joint_op.isVisible = false;
                item_bridge_joint_mp.isVisible = false;
            }
            item_bridge_joint_mp.isAmpOutputsTypeGroup = (Ams.getCurrentOutputsTypeGroup() === Ams.AMP_OUTPUTS_GROUP_1);
            item_bridge_joint_ad.isVisible = (Ams.getDeviceType() === Ams.R80A);

            io.hasMeter = Ams.isHasGainDetectModule();
            var delayStep_ms = Ams.getDelayStep() / 1000;
            grahp_frame.delayStep_ms = delayStep_ms;
            sf.delayStep_ms = delayStep_ms;
            ioInputEQ.delayStep_ms = delayStep_ms;
            io.delayStep_ms = delayStep_ms;
        }else{
            sf.clearTag();
//            tb_dr.visible=true;
//            if( bar_routings.currentIndex!=Ams.DIGITAL){
//                 bar_routings.currentIndex=Ams.DIGITAL;
//            }
//            bar_routings.currentIndex=Ams.ANALOG;
            item_bridge_joint_ad.isVisible = item_bridge_joint_gh.isVisible = item_bridge_joint_ij.isVisible = item_bridge_joint_kl.isVisible = item_bridge_joint_mn.isVisible = item_bridge_joint_op.isVisible = item_bridge_joint_mp.isVisible = false;
            io.hasMeter = false;
        }
        btn_bridge_joint_gh.updateView();
        btn_bridge_joint_ij.updateView();
        btn_bridge_joint_kl.updateView();
        btn_bridge_joint_mn.updateView();
        btn_bridge_joint_op.updateView();
        //reset_win.initItemState();
//        channel_vol.setViewVolume(0);
        if (Ams.getDeviceType() == Ams.GSR1 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.0") >= 0) {
//            channel_vol.setVolumeRange(-20, 10);
//            channel_vol.inputValidator.bottom = -20;
//            channel_vol.inputValidator.top = 10;
            io.isOldDtsCornerFrqControl = false;
        } else {
//            if (channel_vol.maxValue > 0) {
//                channel_vol.setVolumeRange(-20, 0);
//                channel_vol.inputValidator.bottom = -20;
//                channel_vol.inputValidator.top = 0;
//            }
            io.isOldDtsCornerFrqControl = true;
        }
    }

    function isCnLang(){
        return settings.lang=="cn"?true:false;
    }

    function updateView() {
        /* 刷新当前停留界面 */
        var saveIndex = stacks.currentIndex;
        switch (stacks.currentIndex) {
        case 0: //刷新“信号”界面
            /* 模拟“信号”按钮点击事件 */
            io_button.selected = false;
            io_button.selected = true;
            break;
        case 1: //刷新“处理”界面(改名“主界面”)
            /* 模拟“处理”按钮点击事件 */
            dsp_button.selected = false;
            dsp_button.selected = true;
            break;
        case 2: //刷新“设置”界面
            /* 模拟“设置”按钮点击事件 */
            setting_button.selected = false;
            setting_button.selected = true;
            break;
        case 4: //刷新“设置输入源EQ”界面
            /* 模拟“设置输入源EQ”按钮点击事件 */
            btn_input_eq.selected = false;
            btn_input_eq.selected = true;
            break;
        default:
            break;
        }
        if (stacks.currentIndex == saveIndex) {
            stacks.currentIndexChanged(); //强行发送stacks.currentIndex值改变信号
        }

//        row_check.spacing = Ams.getOutputsLength()>10?6:27;
//        io.dropRowSpacing = row_check.spacing;
        main_vol.updateView(); //主音量界面刷新
        main_vol.resetState(250);
    }

    function updChanle(){
        //去空格
        var ts=""+root.getRemapedOutputName(Ams.getOutputViewIdxByCmdLineIdx(Ams.getCurrentMaster()));
        ts=ts.replace("  "," ");
        channel_vol.txt=ts;//刷新通道选中
    }

    function closeDia(){
        md_upd.visible=false;
        md_dif.visible=false;
    }

    function openDia(){
        var result=isNeedUpd();
//        console.log("openDia return: "+result.code+","+result.msg);
        sf.updAmsVer();
        if(result.code==Ams.UPD_NO){
            //console.log(result.code+"----------->"+Ams.UPD_NO+"-----没更新");
            closeDia();
            dev_state.isConnected = true;
            dev_state.isIdentified = false;
            //hidIO.syncData();
            hidIO.statusCmdIdx = Ams.getDeviceStatusReq(hidIO, hidIO.setStatusCmdStartIdx);
        }else if(result.code==Ams.UPD_ADP_MIN){//固件版本过低
            //console.log(result.code+"----------->"+Ams.UPD_ADP_MIN+"-----太低");
            var curFirm=Ams.readFirmwareVersion();
            var newFirm=getLoaclFirmVersion();
            console.log("------getFirm------>"+newFirm);

            //混音适配兼容问题
            if(Ams.getDeviceType() == Ams.GD16 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0 && Ams.getFirmwareCode() <= 10257){
                md_dif.showDias(qsTr("适配错误"),qsTr("请使用V1.2.0以下")+qsTr("调音软件")+qsTr("版本"));
            } else if ((Ams.versionCmp(curFirm, newFirm) === 0 && parseInt(Ams.readFirmwareCurCode()) === parseInt(getLoaclFirmBuildCode())) || (Ams.versionCmp(curFirm, newFirm) < 0 && hidIO.getFirmwareDevInfo() == "")) { //版本过低且没相应型号新固件
                md_dif.showDias(qsTr("固件")+qsTr("版本过低"),qsTr("未搜索到可升级的")+qsTr("固件"));
                dev_state.isConnected=false;
                dev_state.isIdentified = false;
            } else{
                dev_state.isConnected=true;
                if (Ams.getPwdCheckedState() < 1) {
                    passwd_check_frame.modalShow();
                    return;
                }
                md_upd.showDiasi(qsTr("固件")+qsTr("更新"), qsTr("新固件版本：")/*+"V"*/+newFirm+"("+getLoaclFirmBuildCode()+")\n\n"+qsTr("更新信息：")+"\n"+getFirmTips()+"\n\n"+qsTr("提示：\n更新固件才能适配此版本调音软件。"));
            }
        }else if(result.code==Ams.UPD_ADP_MAX){//软件版本过低
            // console.log(result.code+"----------->"+Ams.UPD_ADP_MIN+"-----太高");
            md_dif.showDias(qsTr("适配错误"),qsTr("调音软件")+qsTr("版本太低，请更新。"));
            dev_state.isConnected=false;
            dev_state.isIdentified = false;
        }else if(result.code==Ams.UPD_DIF_DEV_ERROR){//型号错误
            // console.log(result.code+"----------->"+Ams.UPD_ADP_MIN+"-----型号");
            dev_state.isConnected=false;
            dev_state.isIdentified = false;
            lbTypeChange((Ams.isForCDT() && !Ams.isForFactoryTest()) ? "" : qsTr("未连接"));
            //md_dif.showDias(qsTr("适配错误"),qsTr("请使用匹配的")+qsTr("调音软件"));
            busyView.modalShow(qsTr("设备识别失败，") + qsTr("请使用匹配的调音软件！"));
        }
    }

    DspMessageDialog
    {
        id: msgBox_A2BIAPStatus
        standardButtons: StandardButton.Yes
//        modality: Qt.ApplicationModal
        icon: StandardIcon.Critical
        rejectable: false //不允许拒绝处理
        title:""
        text:""

        onVisibleChanged: {
            if (visible) {
                busyView.hide();
            }
        }

        onYes:
        {
            fileDialog_upgrade_A2B_board.callback = msgBox_A2BIAPStatus;
            var internalVersion = hidIO.readInternalA2BIAPFirmwareVersion(false);
            if (internalVersion.length > 0) {
                fileDialog_upgrade_A2B_board.byInternal = true; //标识为使用内部固件升级
                //fileDialog_upgrade_A2B_board.startUpgradeA2B(true);
                //zr_download.downloadA2BFirmwareOrStartUpgrade();
                showCloseDias("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件")+qsTr("更新"),qsTr("发现")+qsTr("新固件版本：")+hidIO.readInternalA2BIAPFirmwareVersion(false)+"\n\n"+qsTr("更新信息：")+"\n"+root.getFirmTips_A2B()+"\n\n"+qsTr("确认升级吗？"),6);
            } else {
                fileDialog_upgrade_A2B_board.visible = true; //显示A2BIAP升级弹窗
            }
        }

        function showDias(titls,ctx){
            showDiasi(titls,ctx,StandardIcon.Critical);
        }
        function showDiasi(titls,ctx,ic){
            title=titls;
            text=ctx;
            icon=ic
            visible=true;
        }
    }

    DspMessageDialog
    {
        id: msgBox_universal
        children_extend: undefined
        standardButtons: StandardButton.Yes
//        modality: Qt.ApplicationModal
        icon: StandardIcon.Critical
        title:""
        text:""
        property var callbackHandler: null

        onYes:
        {
            if (msgBox_universal.callbackHandler != null) {
                msgBox_universal.callbackHandler();
            }
        }
        onRejected: {

        }

        onIconClicked: {
            if (children_extend != undefined) {
                children_extend.iconClicked();
            }
        }

        onVisibleChanged: {
            if (Ams.isForCDT() && !Ams.isForFactoryTest()) {
                if (!visible) {
                    dcb_type.reloadDemo(root.isAcceptedDeviceType(Ams.getDeviceType()) ? Ams.getDeviceType() : dcb_type.model[0]);
                }
            }

            if (!visible) {
                msgBox_universal.iconClickable = false;
                children_extend = undefined;
            }
        }

        function showDias(titls,ctx){
            showDiasi(titls,ctx,StandardIcon.Critical);
        }
        function showDiasi(titls,ctx,ic){
            title=titls;
            text=ctx;
            icon=ic
            visible=true;
        }

        QueryCan {
            id: query_can
            parent: msgBox_universal.parent_extend
            visible: msgBox_universal.children_extend == query_can
            property int lastCmdIndex: -1 //保存最后一条指令序号
            property int clickCount: 8
            signal iconClicked();

            onIconClicked: {
                if (clickCount > 1) {
                    clickCount--;
                    if (clickCount < 6) {
                        toast.show(qsTr("再点击") + clickCount + qsTr("次打开隐藏功能！"));
                    }
                } else {
                    query_can.showOptions = true;
                    query_can.readAndShowA2BInitCorrectInfo();
                    //toast.show(qsTr("已打开隐藏功能！"));
                }
            }

            function readAndShowA2BInitCorrectInfo() {
                busyView.show(qsTr("正在获取车型代码，") + qsTr("请稍候..."));
                if (Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readDeviceVersion(), "1.3.x") >= 0 && Ams.versionCmp(Ams.getA2BFirmwareVersion(), "3.0") >= 0) {
                    Ams.devGetA2BNodeInitEnable(query_can);
                    Ams.devGetA2BRouter2Status(query_can);
                }
                lastCmdIndex = Ams.devGetA2BInitCorrect(query_can);
            }

            function handleData(cmdIdx, strRet) {
                Ams.loadCurConfigModeRespParse(strRet);
                if (cmdIdx === lastCmdIndex) {
                    busyView.hide();

                    if (Ams.isHasA2BRoute()) {
                        if (Ams.isA2BQueryCanExist()) {
                            var hasOptions = (Ams.getDeviceType() === Ams.AB218 && Ams.versionCmp(Ams.readDeviceVersion(), "1.3.x") >= 0 && Ams.versionCmp(Ams.getA2BFirmwareVersion(), "3.0") >= 0);
                            if (!hasOptions) {
                                query_can.showOptions = false;
                            }
                            msgBox_universal.iconClickable = hasOptions;
                            msgBox_universal.children_extend = query_can;
                            if (query_can.visible) {
                                query_can.visibleChanged(); //强行触发信号以显示或刷新隐藏开关
                            }
                        }
                        msgBox_universal.showDiasi(qsTr("车型代码"), qsTr("车型代码：") + Ams.getA2BInitCorrectInfo(), StandardIcon.Information);
                    }
                }
            }

            function reset() {
                query_can.clearCache(); //清除CAN数据缓存
                query_can.clickCount = 8; //重置打开隐藏功能(CAN选项)的计数
                query_can.showOptions = false; //不显示CAN选项
            }
        }
    }

    DspMessageDialog
    {
        id:md_dif
        standardButtons: StandardButton.Yes
//        modality: Qt.ApplicationModal
        icon: StandardIcon.Critical
        title:""
        text:""
        onYes:
        {
            qTracert.stopProcess();
            Qt.quit();
        }
        onRejected: {
            qTracert.stopProcess();
            Qt.quit();
        }

        onVisibleChanged: {
            if (Ams.isForCDT() && !Ams.isForFactoryTest()) {
                if (!visible) {
                    dcb_type.reloadDemo(root.isAcceptedDeviceType(Ams.getDeviceType()) ? Ams.getDeviceType() : dcb_type.model[0]);
                }
            }
        }

        function showDias(titls,ctx){
            showDiasi(titls,ctx,StandardIcon.Critical);
        }
        function showDiasi(titls,ctx,ic){
            title=titls;
            text=ctx;
            icon=ic
            md_dif.visible=true;
        }
    }

    Popup {
        id:upd_reset_warning_frm;
        x: (root.width-width)/ 2
        y: (root.height-height)/2
        padding: 32
        width: (settings.lang == "pt") ? 900 : (settings.lang == "es" ? 1100 : 700)
        height: 110 + (settings.lang == "cn" ? 0 : (upd_tipConfirmText.height + upd_tipConfirmText.anchors.topMargin)) + upd_tipText.height
        signal handleData(int cmdIdx, string strRet);
        closePolicy:Popup.NoAutoClose
        implicitWidth: width
        implicitHeight: height
        modal: true
        property var cancleClickHandler: null
        property var closeed: true
        background:Rectangle {
            anchors.horizontalCenter: parent.horizontalCenter
            width: parent.width-10
            height: parent.height-10
            radius: 25
            border.width: 2
            border.color:"#47647f"
            gradient: Gradient {
                GradientStop { position: 0.0; color: "#010406" }
                GradientStop { position: 1.0; color: "#1e3142" }
            }

            /* 用于阻止光标变成底层窗口的输入框光标、拖动光标等 */
            MouseArea {
                anchors.fill: parent
                enabled: upd_reset_warning_frm.visible
            }
        }
        onOpened: {
            timer_twinkle.start();
            io.isToolTipVisibleEnabled = false;
            upd_confirm_text.forceActiveFocus();
            closeed=true;
            delay_confirm.delay_s = 10;
            upd_ab3_ok.enabled = false;
            upd_ab3_ok.txt = qsTr("确认") + " (" + delay_confirm.delay_s + ")";
            delay_confirm.start();
        }
        onClosed: {
            timer_twinkle.stop();
            io.isToolTipVisibleEnabled = true;
            upd_confirm_text.text="";
            if(closeed){
                closeed=!closeed;
//                qTracert.stopProcess();
//                Qt.quit();
            }
            delay_confirm.stop();
            cancleClickHandler = null;
        }

        /* 显示文字提示 */
        Text {
            id:upd_tipText
            x:0
            y:0
            color: timer_twinkle.isBright ? "#fa7f1d" : "#93bced"
            font.pixelSize: 18
            font.bold: true
            text:qsTr("注意：本次升级会丢失所有模式数据，请先备份数据！");
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.horizontalCenterOffset: settings.lang == "cn" ? (-(upd_tipConfirmText.width + upd_confirm_text.width) / 2) : 0
            anchors.top: parent.top
        }

        Text {
            id:upd_tipConfirmText
            x:0
            y:0
            color: timer_twinkle.isBright ? "#fa7f1d" : "#93bced"
            font.pixelSize: 18
            font.bold: true
            text:qsTr("继续请输入(yes)：");
            anchors.left: settings.lang == "cn" ? upd_tipText.right : upd_tipText.left
            anchors.top: settings.lang == "cn" ? parent.top : upd_tipText.bottom
            anchors.topMargin: settings.lang == "cn" ? 0 : 2
        }

        TextField {
            id: upd_confirm_text
            width: isCnLang() ? 40 : 50
            height: 24
            anchors.verticalCenter: upd_tipConfirmText.verticalCenter
            anchors.verticalCenterOffset: 1
            anchors.left: upd_tipConfirmText.right
            maximumLength: 3
            font.bold: settings.fontBold
            font.pixelSize: 14
            color: "#fc7e24"
            verticalAlignment: Text.AlignVCenter
            //                        selectByMouse: rb.checked
            //                        readOnly: !rb.checked
            validator: RegExpValidator{regExp:/[A-Za-z0-9_]+/}
            background: Rectangle{
                id:upd_tx_bkg
                width: parent.width
                height: parent.height
                radius: 5
                gradient: Gradient {
                    GradientStop { position: 0 ; color: "#0e151e" }
                    GradientStop { position: 1 ; color:"#314a68" }
                }
                //                                color: "yellow"
                border.width: 1
                border.color: "#4b5359"
            }
        }

        AmsButton4{
            id:upd_ab3_ok
            anchors.topMargin: 16
            anchors.top: upd_confirm_text.bottom
            //                        anchors.verticalCenter: parent.verticalCenter
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.horizontalCenterOffset: -ab3_cancle.width/2-16
            //                icon_src:"qrc:///image/images/reset.png"
            width: 100
            txt:qsTr("确认")
            enabled: false
            property int lastCmdIdx: -1;
            property int chkCmdIdx: -1
            property int typeCmdIdxOfAdaptable: -1;
            onClicked: {
                if(upd_confirm_text.text!=""&&upd_confirm_text.text.toLowerCase()=="yes"){
                    enabled = false;
                    delay_confirm.stop();
                    upd_reset_warning_frm.closeed=false;
                    busyView.modalShow(qsTr("升级准备中，") + qsTr("请稍候..."));
                    upd_reset_warning_frm.close();
                    hidIO.isEnd=false;
                    hidIO.isChange=false;
                    if (Ams.getDeviceType() == Ams.A10 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) {
                        chkCmdIdx = Ams.devCheckUpgradeValid(upd_ab3_ok);
                    } else {
                        lastCmdIdx = Ams.devResetConfig(upd_ab3_ok);
                        //Ams.setMainMute(upd_ab3_ok, true); //先使设备静音
                        lastCmdIdx = Ams.devDeleteAllConfig(upd_ab3_ok); //删除所有设备模式，以免设备升级完成启动后加载了错误的配置
                    }
                    upd_confirm_text.text="";
                }
            }

            function handleData(cmdIdx, strRet) {
                if (cmdIdx == lastCmdIdx) {
                    lastCmdIdx = -1;
//                    busyView.hide();
                    zr_download.downloadFirmwareOrStartUpgrade();
                } else if (cmdIdx === chkCmdIdx) {
                    chkCmdIdx = -1;
                    if (strRet.indexOf("upgrade_valid?") == 0) {
                        var state = parseInt(strRet.substring(14));
                        if (state == 1) {
                            typeCmdIdxOfAdaptable = Ams.devType(upd_ab3_ok, hidIO.devTIDList[hidIO.devTIDList.length > 1 ? 1 : 0]);
                        } else {
                            hidIO.isEnd=true;
                            busyView.show(qsTr("固件升级失败")+qsTr("，请重启设备再试。"))
                        }
                    } else {
                        lastCmdIdx = Ams.devResetConfig(upd_ab3_ok);
                        //Ams.setMainMute(upd_ab3_ok, true); //先使设备静音
                        lastCmdIdx = Ams.devDeleteAllConfig(upd_ab3_ok); //删除所有设备模式，以免设备升级完成启动后加载了错误的配置
                    }
                } else if (cmdIdx === typeCmdIdxOfAdaptable) {
                    typeCmdIdxOfAdaptable = -1;
                    var res=strRet.split(',');
                    Ams.saveDeviceInfo(res[0],res[1],res[2],res[3],res[4],res[5]);
                    setFirmWarePath();
                    lastCmdIdx = Ams.devResetConfig(upd_ab3_ok);
                    //Ams.setMainMute(upd_ab3_ok, true); //先使设备静音
                    lastCmdIdx = Ams.devDeleteAllConfig(upd_ab3_ok); //删除所有设备模式，以免设备升级完成启动后加载了错误的配置
                }
            }

            Timer {
                id: delay_confirm
                running: false
                repeat: true
                triggeredOnStart: true
                interval: 1000 //间隔1秒执行一次
                property int delay_s: 10 //10秒延时

                onTriggered: {
                    if (delay_s > 0) {
                        upd_ab3_ok.txt = qsTr("确认") + " (" + delay_s + ")";
                        delay_s--;
                    } else {
                        stop();
                        upd_ab3_ok.txt = qsTr("确认");
                        upd_ab3_ok.enabled = true;
                    }
                }
            }
        }
        AmsButton4{
            id:upd_ab3_cancle
            anchors.top: upd_confirm_text.bottom
            anchors.topMargin: 16
            anchors.leftMargin: 16
            anchors.left: upd_ab3_ok.right
            //                icon_src:"qrc:///image/images/reset.png"
            width: 100
            txt:qsTr("取消")
            onClicked: {
                if (upd_reset_warning_frm.cancleClickHandler != null) {
                    upd_reset_warning_frm.cancleClickHandler();
                }
                upd_reset_warning_frm.closeed=true;
                upd_reset_warning_frm.close();
                upd_confirm_text.text="";
//                qTracert.stopProcess();
//                Qt.quit();
            }
        }
    }

    FileDialog {
        id: fileDialog_upgrade_A2B_board
        property var callback: null
        property string file: ""
        property bool byInternal: false //是否为使用内部固件升级
        title: qsTr("请选择文件")
        nameFilters:  [ /*qsTr*/"bin files (*.bin)"]
        signal transStatusChanged(int errorCode);
        signal transProgressChanged(int dealedSize, int totalSize);

        onVisibleChanged: {
            if (visible) {
                busyView.show(qsTr("请稍候..."));
            } else {
                busyView.hide();
            }
        }

        onAccepted: {
            console.log("---------onAccepted---------");
            folder = fileUrl.toLocaleString().substring(0, fileUrl.toLocaleString().lastIndexOf('/')); //必须赋值一次，否则再次弹出时目录不切换，是Qt的Bug？
            file=fileUrl;
            file=file.substring(8);//substract 'file:///'
            if (fileDialog_upgrade_A2B_board.startUpgradeA2B(false)) {
                callback = null;
            }
        }
        onRejected: {
            console.log("---------onRejected---------");
            console.log("Canceled")
            if (callback == msgBox_A2BIAPStatus) {
                msgBox_A2BIAPStatus.open();
            }
        }

        onTransStatusChanged: {
            if (errorCode != 0) {
                console.error("Error: " + hidIO.errorString);
                busyView.hide();
                msgBox_universal.showDias("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级"), "A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级失败！") + "(" + qsTr("错误码：") + errorCode.toString(16) + ")");
            } else {
                //console.error("onTransStatusChanged: " + errorCode);
                zr_download.removeDownloadedA2BFirmwareFile(); //清除已下载的A2B固件数据
                busyView.show("A2B " +qsTr("固件升级完成")+qsTr("，重启设备..."));
                //Ams.devReboot(null); //重启设备
            }
        }

        onTransProgressChanged: {
            busyView.showProgress("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级中，请勿断开设备..."), parseInt(dealedSize * 100 / totalSize));
        }

        function startUpgradeA2B(isByInternal) {
            byInternal = isByInternal;
            if (byInternal) {
                file = hidIO.getInternalA2BIAPFirmwarePath();
            }
            console.log("file:" + file);
            if (Ams.isDebug) {
                toast.show(qsTr("当前为演示模式"));
                return false;
            }

            busyView.show(qsTr("升级准备中，") + qsTr("请稍候..."));

            hidIO.setSendFilePath(file);
            if (!hidIO.readAndCheckSendFileA2BIAPInfo()) {
                toast.show(qsTr("A2B固件识别失败！"));
                if (!byInternal) {
                    busyView.hide();
                }
                return false;
            }

            Ams.setA2BIAPStatus(fileDialog_upgrade_A2B_board, 1, hidIO.readSendFileA2BIAPInfoString());
            return true;
        }

        function handleData(cmdIdx, strRet) {
            if (strRet == "ok") {
                hidIO.transFileCallback = fileDialog_upgrade_A2B_board;
                hidIO.reqSendFile();
            } else {
                busyView.hide();
                if (strRet.indexOf("error?") == 0) {
                    var errorCode = parseInt(strRet.substring(6));
                    msgBox_universal.showDias("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级"), "A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级失败！") + "(" + qsTr("错误码：") + errorCode.toString(16) + ")");
                } else {
                    msgBox_universal.showDias("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级"), "A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件升级失败！"));
                }
                //hidIO.statusCmdIdx = Ams.getDeviceStatusReq(hidIO); //重新获取设备当前状态
            }
        }

        function isA2BIAPCallback(callback) {
            if (callback == fileDialog_upgrade_A2B_board) {
                return true;
            }
            return false;
        }
    }

    DspMessageDialog
    {
        id:md_upd
        standardButtons: StandardButton.Yes | StandardButton.No
//        modality: Qt.ApplicationModal
        title: ""
        text:""
        icon: StandardIcon.Warning
        property int chkCmdIdx: -1
        property int typeCmdIdxOfAdaptable: -1;
        onYes:
        {
//            updFile.open();
            var verLocal= Ams.readFirmwareVersion();
            if(Ams.isNeedResetConfigAfterUpgrade() || (((Ams.getDeviceType() == Ams.GD16 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) || (Ams.getDeviceType() == Ams.GD10 && Ams.versionCmp(Ams.readDeviceVersion(), "2.0.0") < 0))&&Ams.versionCmp(verLocal, "1.2.0") < 0)){
                busyView.hide();
                upd_reset_warning_frm.cancleClickHandler = function() { md_upd.visible = true; };
                upd_reset_warning_frm.open();
            }else{
                hidIO.isEnd=false;
                hidIO.isChange=false;
                if (Ams.getDeviceType() == Ams.A10 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) {
                    chkCmdIdx = Ams.devCheckUpgradeValid(md_upd);
                } else {
                    zr_download.downloadFirmwareOrStartUpgrade();
                }
            }
        }
        onNo: {
            qTracert.stopProcess();
            Qt.quit();
        }
        onRejected: {
            qTracert.stopProcess();
            Qt.quit();
        }
        function showDiasi(titls,ctx){
            title=titls;
            text=ctx;
            md_upd.visible=true;
        }

        function handleData(cmdIdx, strRet) {
            if (cmdIdx === chkCmdIdx) {
                chkCmdIdx = -1;
                if (strRet.indexOf("upgrade_valid?") == 0) {
                    var state = parseInt(strRet.substring(14));
                    if (state == 1) {
                        typeCmdIdxOfAdaptable = Ams.devType(md_upd, hidIO.devTIDList[hidIO.devTIDList.length > 1 ? 1 : 0]);
                        //zr_download.downloadFirmwareOrStartUpgrade();
                    } else {
                        hidIO.isEnd=true;
                        busyView.show(qsTr("固件升级失败")+qsTr("，请重启设备再试。"))
                    }
                } else {
                    zr_download.downloadFirmwareOrStartUpgrade();
                }
            } else if (cmdIdx === typeCmdIdxOfAdaptable) {
                typeCmdIdxOfAdaptable = -1;
                var res=strRet.split(',');
                Ams.saveDeviceInfo(res[0],res[1],res[2],res[3],res[4],res[5]);
                setFirmWarePath();
                zr_download.downloadFirmwareOrStartUpgrade();
            }
        }
    }

//    FileDialog {
//        id: updFile
//        property string file: "./default.bin"
//        title: ""
//        //  folder: shortcuts.home
//        nameFilters:  [ /*qsTr*/"DSP bin files (*.bin)"]
//        signal intputEnd();
//        onIntputEnd: {
//            passwd_input_frame.call_back_target=null;
//            //console.log("user password:"+local_root.password);
//            parseFile(file);
//        }
//        onVisibleChanged: {
//            if (visible) {
//                busyView.show(qsTr("请稍候..."));
//            } else {
//                busyView.hide();
//            }
//        }
//        onAccepted: {

//        }
//        onRejected: {
//            md_upd.visible=true;
//        }

//    }

    function isNeedUpd(){
        //        if(Ams.softdeviceType==Ams.getDeviceType()){
        var adapter="";

        if (Ams.isForCDT()) {
            if (!root.isAcceptedDeviceType(Ams.getDeviceType())) {
                return {code:Ams.UPD_DIF_DEV_ERROR,msg:"设备不存在"};
            }
        }

        if (Ams.isForAB216() || Ams.isForAB16AndAB22()) {
            if (Ams.getDeviceType()===Ams.AB216_D9) {
                adapter=Ams.AB216_D9_AdapterJson;
            } else if (Ams.getDeviceType()===Ams.AB216_M9) {
                adapter=Ams.AB216_M9_AdapterJson;
            } else if (Ams.getDeviceType()===Ams.AB216_U && Ams.versionCmp(Ams.readDeviceVersion(), "1.2.x") == 0) {
                adapter=Ams.AB216_U_AdapterJson;
            } else if(Ams.getDeviceType()===Ams.R408 && Ams.isForAB216()){
                adapter=Ams.R408_AdapterJson;
            }
        } else {
            if(Ams.getDeviceType()===Ams.GD16){
                if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) {
                    adapter=Ams.GD16_AdapterJson_Old;
                } else {
                    //if (!(Ams.isForInternational() && Ams.getCurDevTID() === "DSP1.0")) {
                    //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                        adapter=Ams.GD16_AdapterJson;
                    //}
                }
            }else if(Ams.getDeviceType()===Ams.GD10){
                if (Ams.versionCmp(Ams.readDeviceVersion(), "2.0.0") < 0) {
                    adapter=Ams.GD10_AdapterJson_Old;
                } else {
                    adapter=Ams.GD10_AdapterJson;
                }
//            }else if(Ams.getDeviceType()===Ams.GD12){
//                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
//                    adapter=Ams.GD12_AdapterJson;
//                //}
//            }else if(Ams.getDeviceType()===Ams.R210){
//                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
//                    adapter=Ams.R210_AdapterJson;
//                //}
            }else if(Ams.getDeviceType()===Ams.R216A) {
                if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") { //使用歌航默认标识的设备仅允许歌航版PC端识别
                    adapter=Ams.R216A_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.GDT212){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10018) {
                        adapter=Ams.GDT212_AdapterJson;
                    }
                } else if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForIndonesia() || Ams.isForColombia()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.1") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.0.x") != 0) {
                        adapter=Ams.GDT212_AdapterJson;
                    } else {
                        adapter=Ams.GDT212_AdapterJson_Indonesia_Colombia_Old;
                    }
                } else if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.2") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "21.0.x") != 0) {
                        adapter=Ams.GDT212_AdapterJson;
                    } else {
                        adapter=Ams.GDT212_AdapterJson_CDT_Old;
                    }
                } else {
                    adapter=Ams.GDT212_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.R212){
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.R212_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.GDT216){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10054) {
                        adapter=Ams.GDT216_AdapterJson;
                    }
                } else if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.3.2") >= 0) {
                        adapter=Ams.GDT216_AdapterJson;
                    } else {
                        adapter=Ams.GDT216_AdapterJson_CDT_Old;
                    }
                } else if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.2.x") != 0/* 不兼容韩国CDT的定制版 */) {
                    if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForIndonesia() || Ams.isForColombia()) {
                        if (Ams.versionCmp(Ams.readDeviceVersion(), "1.1.x") == 0) {
                            if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.3.1") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.1.x") != 0) {
                                adapter=Ams.GDT216_AdapterJson;
                            } else {
                                adapter=Ams.GDT216_AdapterJson_Indonesia_Colombia_Old;
                            }
                        } else if (Ams.versionCmp(Ams.readDeviceVersion(), "2.0.0") >= 0) {
                            adapter=Ams.GDT216_AdapterJson;
                        }
                    } else {
                        adapter=Ams.GDT216_AdapterJson;
                    }
                }
            }else if(Ams.getDeviceType()===Ams.R216){
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.R216_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.R316){
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.R316_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.R336){
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.R336_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.GD46){
                if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0) {
                    adapter=Ams.GD46_HW1_0_x_AdapterJson;
                } else if (Ams.versionCmp(Ams.readDeviceVersion(), "2.0.x") == 0) {
                    adapter=Ams.GD46_HW2_0_x_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.GDT46){
                adapter=Ams.GDT46_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.GDT46PRO){
                adapter=Ams.GDT46PRO_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.GD6){
                adapter=Ams.GD6_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.GD4){
                adapter=Ams.GD4_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.GD28){
                adapter=Ams.GD28_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.GDT28){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10036) {
                        adapter=Ams.GDT28_AdapterJson;
                    }
                } else if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.4.2") >= 0) {
                        adapter=Ams.GDT28_AdapterJson;
                    } else {
                        adapter=Ams.GDT28_AdapterJson_CDT_Old;
                    }
                } else if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.2.x") != 0/* 不兼容韩国CDT的定制版 */) {
                    if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForIndonesia() || Ams.isForColombia()) {
                        if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.4.1") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.3.x") != 0) {
                            adapter=Ams.GDT28_AdapterJson;
                        } else {
                            adapter=Ams.GDT28_AdapterJson_Indonesia_Colombia_Old;
                        }
                    } else {
                        adapter=Ams.GDT28_AdapterJson;
                    }
                }
            }else if(Ams.getDeviceType()===Ams.R28){
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.R28_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.GDT68){
                if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readDeviceVersion(), "2.1.x") == 0) {
                        adapter=Ams.GDT68_HW2_1_x_AdapterJson_CDT_Old;
                    }
                } else {
                    if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0) {
                        adapter=Ams.GDT68_HW1_0_x_AdapterJson;
                    } else if (Ams.versionCmp(Ams.readDeviceVersion(), "2.0.x") == 0) {
                        adapter=Ams.GDT68_HW2_0_x_AdapterJson;
                    } else if (Ams.versionCmp(Ams.readDeviceVersion(), "2.1.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "2.2.x") != 0/* 不兼容韩国CDT的定制版 */) {
                        adapter=Ams.GDT68_HW2_1_x_AdapterJson;
                    }
                }
            }else if(Ams.getDeviceType()===Ams.GDT68PRO){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10019) {
                        adapter=Ams.GDT68PRO_AdapterJson;
                    }
                } else if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.2.2") >= 0) {
                        adapter=Ams.GDT68PRO_AdapterJson;
                    } else {
                        adapter=Ams.GDT68PRO_AdapterJson_CDT_Old;
                    }
                } else if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.x") != 0/* 不兼容韩国CDT的定制版 */) {
                    if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForIndonesia() || Ams.isForColombia()) {
                        if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.2.1") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.0.x") != 0) {
                            adapter=Ams.GDT68PRO_AdapterJson;
                        } else {
                            adapter=Ams.GDT68PRO_AdapterJson_Indonesia_Colombia_Old;
                        }
                    } else {
                        adapter=Ams.GDT68PRO_AdapterJson;
                    }
                }
            }else if(Ams.getDeviceType()===Ams.R68) {
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.R68_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.R68A) {
                if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") { //使用歌航默认标识的设备仅允许歌航版PC端识别
                    adapter=Ams.R68A_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.R80A) {
                if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") { //使用歌航默认标识的设备仅允许歌航版PC端识别
                    adapter=Ams.R80A_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.GDT42){
                if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readDeviceVersion(), "2.0.x") == 0 && (Ams.versionCmp(Ams.readFirmwareVersion(), "2.1.0") >= 0 || (Ams.versionCmp(Ams.readFirmwareVersion(), "2.0.400") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "2.0.500") < 0))) { //只识别256K的GDT42_V3.0
                        if (Ams.isForFactoryTest()) {
                            if (Ams.getFirmwareCode() >= 10035) {
                                adapter=Ams.GDT42_HW2_0_x_AdapterJson;
                            }
                        } else {
                            if (Ams.versionCmp(Ams.readFirmwareVersion(), "2.2.603") >= 0) {
                                adapter=Ams.GDT42_HW2_0_x_AdapterJson;
                            } else {
                                adapter=Ams.GDT42_HW2_0_x_AdapterJson_Old;
                            }
                        }
                    }
                } else {
                    if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0) {
                        adapter=Ams.GDT42_HW1_0_x_AdapterJson;
                    } else if (Ams.versionCmp(Ams.readDeviceVersion(), "2.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "2.1.x") != 0/* 不兼容韩国CDT的定制版 */) {
                        if (Ams.isForFactoryTest()) {
                            if (Ams.getFirmwareCode() >= 10035) {
                                adapter=Ams.GDT42_HW2_0_x_AdapterJson;
                            }
                        } else if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForColombia()) {
                            if (Ams.versionCmp(Ams.readFirmwareVersion(), "2.2.602") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "12.0.x") != 0) {
                                adapter=Ams.GDT42_HW2_0_x_AdapterJson;
                            } else {
                                adapter=Ams.GDT42_HW2_0_x_AdapterJson_Colombia_Old;
                            }
                        } else {
                            adapter=Ams.GDT42_HW2_0_x_AdapterJson;
                        }
                    }
                }
            }else if(Ams.getDeviceType()===Ams.GDT42A) {
                if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") { //使用歌航默认标识的设备仅允许歌航版PC端识别
                    adapter=Ams.GDT42A_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.GDT08) {
                adapter=Ams.GDT08_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.GDT06){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10008) {
                        adapter=Ams.GDT06_AdapterJson;
                    }
                } else if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForColombia()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.0") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.0.x") != 0) {
                        adapter=Ams.GDT06_AdapterJson;
                    } else {
                        adapter=Ams.GDT06_AdapterJson_Colombia_Old;
                    }
                } else {
                    adapter=Ams.GDT06_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.A4_PRO){
                adapter=Ams.A4PRO_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.A10){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10024) {
                        adapter=Ams.A10_AdapterJson;
                    }
                } else if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.2.2") >= 0) {
                        adapter=Ams.A10_AdapterJson;
                    } else {
                        adapter=Ams.A10_AdapterJson_CDT_Old;
                    }
                } else if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.1.x") != 0/* 不兼容韩国CDT的定制版 */) {
                    adapter=Ams.A10_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.A5){
                if (Ams.isForCDT()) {
                    if (Ams.versionCmp(Ams.readDeviceVersion(), "3.0.x") == 0 && (/*Ams.versionCmp(Ams.readFirmwareVersion(), "1.5.0") >= 0 || */Ams.versionCmp(Ams.readFirmwareVersion(), "1.4.400") >= 0)) { //只识别A5_V3.1
                        if (Ams.isForFactoryTest()) {
                            if (Ams.getFirmwareCode() >= 10313) {
                                adapter=Ams.A5_HW3_0_x_AdapterJson;
                            }
                        } else {
                            if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.7.2") >= 0) {
                                adapter=Ams.A5_HW3_0_x_AdapterJson;
                            } else {
                                adapter=Ams.A5_HW3_0_x_AdapterJson_Old;
                            }
                        }
                    }
                } else {
                    if (Ams.versionCmp(Ams.readDeviceVersion(), "3.0.x") < 0) {
                        adapter=Ams.A5_AdapterJson;
                    } else if (Ams.versionCmp(Ams.readDeviceVersion(), "3.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.5.x") != 0/* 不兼容韩国CDT的定制版 */) {
                        if (Ams.isForFactoryTest()) {
                            if (Ams.getFirmwareCode() >= 10313) {
                                adapter=Ams.A5_HW3_0_x_AdapterJson;
                            }
                        } else {
                            if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForIndonesia() || Ams.isForColombia()) {
                                if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.7.1") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.6.x") != 0) {
                                    adapter=Ams.A5_HW3_0_x_AdapterJson;
                                } else {
                                    adapter=Ams.A5_HW3_0_x_AdapterJson_Indonesia_Colombia_Old;
                                }
                            } else {
                                adapter=Ams.A5_HW3_0_x_AdapterJson;
                            }
                        }
                    }
                }
            }else if(Ams.getDeviceType()===Ams.A6){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10009) {
                        adapter=Ams.A6_AdapterJson;
                    }
                } else {
                    adapter=Ams.A6_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.G1_PRO){
                if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") { //使用歌航默认标识的设备仅允许歌航版PC端识别
                    adapter=Ams.G1_PRO_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.G2){
                adapter=Ams.G2_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.G3){
                adapter=Ams.G3_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.G2_PRO){
                if (Ams.isForFactoryTest()) {
                    if (Ams.getFirmwareCode() >= 10045) {
                        adapter=Ams.G2PRO_AdapterJson;
                    }
                } else {
                    if ((Ams.isForInternational() && Ams.isOldFirmwareVersion()) || Ams.isForIndonesia() || Ams.isForColombia()) {
                        if (Ams.versionCmp(Ams.readFirmwareVersion(), "1.2.1") >= 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "11.1.x") != 0) {
                            adapter=Ams.G2PRO_AdapterJson;
                        } else {
                            adapter=Ams.G2PRO_AdapterJson_Indonesia_Colombia_Old;
                        }
                    } else {
                        adapter=Ams.G2PRO_AdapterJson;
                    }
                }
    //            }else if(Ams.getDeviceType()===Ams.G3_PRO){
    //                adapter=Ams.G3PRO_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.G5){
                //if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") {
                    adapter=Ams.G5_AdapterJson;
                //}
            }else if(Ams.getDeviceType()===Ams.P1_DSP){
                if (Ams.isForGoldHorn() || Ams.getCurDevTID() !== "DSP1.0") { //使用歌航默认标识的设备仅允许歌航版PC端识别
                    adapter=Ams.P1_DSP_AdapterJson;
                }
            }else if(Ams.getDeviceType()===Ams.GSR1){
                adapter=Ams.GSR1_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.VSR4){
                adapter=Ams.VSR4_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.VSR5){
                adapter=Ams.VSR5_AdapterJson;
            }else if(Ams.getDeviceType()===Ams.VSR6){
                adapter=Ams.VSR6_AdapterJson;
            } else if(Ams.getDeviceType()===Ams.AB216_D9){
                if (Ams.isForGoldHorn() && Ams.getCurDevTID() !== "DSP1.0") { //仅识别映射为AB316-*的型号
                    adapter=Ams.AB216_D9_AdapterJson;
                }
            } else if(Ams.getDeviceType()===Ams.AB216_M9){
                if (Ams.isForGoldHorn() && Ams.getCurDevTID() !== "DSP1.0") { //仅识别映射为AB316-*的型号
                    adapter=Ams.AB216_M9_AdapterJson;
                }
            } else if(Ams.getDeviceType()===Ams.AB216_U && Ams.versionCmp(Ams.readDeviceVersion(), "1.2.x") == 0) {
                if (Ams.isForGoldHorn() && Ams.getCurDevTID() !== "DSP1.0") { //仅识别映射为AB316-*的型号
                    adapter=Ams.AB216_U_AdapterJson;
                }
//            }else if(Ams.getDeviceType()===Ams.R408){
//                if (Ams.isForAB216()) {
//                    adapter=Ams.R408_AdapterJson;
//                }
            } else if(Ams.getDeviceType()===Ams.AB212){
                adapter=Ams.AB212_AdapterJson;
            } else if(Ams.getDeviceType()===Ams.AB218){
                if (Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0 || Ams.versionCmp(Ams.readDeviceVersion(), "1.1.x") == 0) {
                    adapter=Ams.AB218_HW1_0_x_HW1_1_x_AdapterJson;
                } else if (Ams.versionCmp(Ams.readDeviceVersion(), "1.2.x") == 0) {
                    adapter=Ams.AB218_HW1_2_x_AdapterJson;
                } else if (Ams.versionCmp(Ams.readDeviceVersion(), "1.3.x") == 0) {
                    adapter=Ams.AB218_HW1_3_x_AdapterJson;
                }
            }
        }

        if(adapter!=""){
            return checkVersion(Ams.readFirmwareVersion(), adapter.adapterVersionMin, adapter.adapterVersionMax);
        }else{
            return {code:Ams.UPD_DIF_DEV_ERROR,msg:"设备不存在"};
        }
    }

    function checkVersion(local, min, max) {
        //console.log("checkVersion: local = " + local + ", min = " + min + ", max = " + max);
        if ((Ams.getDeviceType() == Ams.A10 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.0") == 0 && Ams.getFirmwareCode() < 10002) ||
                (Ams.getDeviceType() == Ams.A5 && Ams.versionCmp(Ams.readDeviceVersion(), "3.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.4.400") < 0)) {
            return {code:Ams.UPD_NO,msg:"不需要更新"};
        } else {
            if (Ams.isForInternational() || Ams.isForIndonesia()) {
                if (Ams.isOldFirmwareVersion() && Ams.isInOldSpecialDealDeviceListForIndonesia()) {
                    return {code:Ams.UPD_ADP_MIN,msg:"固件版本小于兼容版本"};
                }
            } else if (Ams.isForCDT()) {
                if (Ams.getDeviceType() == Ams.GDT28 && Ams.versionCmp(Ams.readDeviceVersion(), "2.2.0") == 0) {
                    if (Ams.getFirmwareCode()<10017) {
                        return {code:Ams.UPD_ADP_MIN,msg:"固件版本小于兼容版本"};
                    }
                }
            }
        }

        var locals = local.split(".");
        var mins = min.split(".");
        var maxs = max.split(".");
        var isNeedCmpMin = true;
        var isNeedCmpMax = true;

        for (var i = 0; i < 3; i++) {
            if (isNeedCmpMax) {
                if (maxs[i] != "x") {
                    if (parseInt(locals[i]) > parseInt(maxs[i])) {
                        return {code:Ams.UPD_ADP_MAX,msg:"软件版本小于兼容版本"};
                    } else if (parseInt(locals[i]) < parseInt(maxs[i])) { //设备版本的当前字段比最高适配版本相应字段小，后续不需要再比较
                        isNeedCmpMax = false;
                    }
                }
            }
            if (isNeedCmpMin) {
                if (mins[i] != "x") {
                    if (parseInt(locals[i]) < parseInt(mins[i])) {
                        if (Ams.isForIndonesia()) {
                            if (Ams.isOldFirmwareVersion()) { //部分设备的特殊处理
                                if (Ams.isInOldSpecialDealDeviceListForIndonesia()) {
                                    return {code:Ams.UPD_NO,msg:"不需要更新"}; //不直接弹窗提示升级，只在“关于”界面显示升级图标
                                } else {
                                    return {code:Ams.UPD_DIF_DEV_ERROR,msg:"设备不存在"};
                                }
                            }
                        } else if (Ams.isForColombia()) {
                            if (Ams.isOldFirmwareVersion()) { //部分设备的特殊处理
                                if (Ams.isInSpecialDealDeviceListForColombia()) {
                                    return {code:Ams.UPD_NO,msg:"不需要更新"}; //不直接弹窗提示升级，只在“关于”界面显示升级图标
                                } else {
                                    return {code:Ams.UPD_DIF_DEV_ERROR,msg:"设备不存在"};
                                }
                            }
                        }
                        return {code:Ams.UPD_ADP_MIN,msg:"固件版本小于兼容版本"};
                    } else if (parseInt(locals[i]) > parseInt(mins[i])) { //设备版本的当前字段比最低适配版本相应字段大，后续不需要再比较
                        isNeedCmpMin = false;
                    }
                }
            }
            if (!isNeedCmpMax && !isNeedCmpMin) { //条件成立则表示已满足适配范围，直接返回
                return {code:Ams.UPD_NO,msg:"不需要更新"};
            }
        }

        return {code:Ams.UPD_NO,msg:"不需要更新"};
    }

    property var xmlhttp: null

    function getFirm(){
//        if(Ams.getDeviceType()==Ams.GD16&&Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0&&Ams.firmwareCode==10257){
//            sf.changeNew(sf.latest,-1,"","","","");
//            return;
//        }
        var verLocalFirm=Ams.readFirmwareVersion();
        var newFirm=getLoaclFirmVersion();
        if (Ams.isDebug)   console.log("------getFirm------>"+newFirm);
        if(/*Ams.versionCmp(verLocalFirm, newFirm) < 0 || */(parseInt(Ams.readFirmwareCurCode()) < parseInt(getLoaclFirmBuildCode()))){//设备固件构建版本小于pc本地固件构建版本
            if (((Ams.getDeviceType()==Ams.A5 || Ams.getDeviceType()==Ams.GD28 || (Ams.getDeviceType()==Ams.GD46 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0)) && Ams.getFirmwareCode()<10272) ||
                    (Ams.getDeviceType() == Ams.A10 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.0") == 0 && Ams.getFirmwareCode() < 10002) ||
                    (Ams.getDeviceType() == Ams.A5 && Ams.versionCmp(Ams.readDeviceVersion(), "3.0.x") == 0 && Ams.versionCmp(Ams.readFirmwareVersion(), "1.4.400") < 0)) {
                sf.changeNew(sf.latest,sf.latest,"","","",""); //部分型号的固件版本不更新
            } else {
                sf.changeNew(sf.latest,sf.firm_pc,"","",newFirm,getFirmTips());
            }
        }else{
            sf.changeNew(sf.latest,sf.latest,"","","","");
        }
    }

    function specialVersionDeal() {
        if ((Ams.getDeviceType() == Ams.GD4 || Ams.getDeviceType() ==  Ams.GD6) && Ams.getFirmwareCode() <= 10208) { //针对GD4、GD6指定版本固件缺陷的特殊处理
            Ams.disableAnalogInputAliasAndPhase(); //使输入源别名及相位设置功能无效
        }
    }

    function remaindUpgrade() {
        /* 部分型号连接后即弹出升级提示，或标识为需要提醒升级则连接后即弹出升级提示  */
        var cloudVersion = Ams.getCloudVersionInfo();
        if((cloudVersion != null && cloudVersion.remind_upgrade != undefined && parseInt(cloudVersion.remind_upgrade) > 0) ||
                ((cloudVersion != null && cloudVersion.remind_to_upgrade != undefined && parseInt(cloudVersion.remind_to_upgrade) > 0) && Ams.getFirmwareCode() < parseInt(getLoaclFirmBuildCode())) ||
                ((Ams.getDeviceType()==Ams.GD28 || (Ams.getDeviceType()==Ams.GD46 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.x") == 0)) && Ams.getFirmwareCode()==10272) ||
                (Ams.getDeviceType()==Ams.A5 && Ams.getFirmwareCode()<10279) ||
//                (Ams.getDeviceType()==Ams.GD10 && Ams.versionCmp(Ams.readDeviceVersion(), "2.0.0") < 0 && Ams.getFirmwareCode()==10202) ||
//                ((Ams.getDeviceType()==Ams.GD4 || Ams.getDeviceType()==Ams.GD6) && Ams.getFirmwareCode()==10206) ||
                ((Ams.getDeviceType()==Ams.G2 || Ams.getDeviceType()==Ams.G3) && Ams.getFirmwareCode()<10018) ||
                (Ams.getDeviceType()==Ams.A4_PRO && Ams.getFirmwareCode()<10008)) {
            sf.changeNew(sf.latest,sf.firm_pc,"","",getLoaclFirmVersion(),getFirmTips());
            sf.updFram();
        }
    }

    property var ver_url: "http://china-gehang.com.cn/if/DSP/dsp_";

    function getVer(type){
        xmlhttp=new XMLHttpRequest();
        var add=ver_url+type+".ver";
        if (xmlhttp!=null)
        {
            xmlhttp.open("POST",add,true);
//            xmlhttp.overrideMimeType("text/html;charset=utf-8");//设定以gb2312编码识别数据
            xmlhttp.onreadystatechange=state_Change;
            xmlhttp.send(null);
        }else{
            if (Ams.isDebug)  console.log("--------openelse----------")
            //            openDia();
        }
    }

    function state_Change()
    {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {// 4 = "loaded"
            if (xmlhttp.status==200)     {// 200 = OK
                // if response is JSON you can parse it
                var response = JSON.parse(xmlhttp.responseText);
                for(var i=0;i<response.length;i++){
//                    if(response[i].target!=download.osType)
//                    {
//                        console.log("skip unmatched version:"+response[i].target+" wanted:"+download.osType);
//                        continue;
//                    }
                    var new_soft_ver=response[i].softversion;
                    var new_soft_code=response[i].softcode;
                    var new_firmware_ver=response[i].firmwareversion;
                    var new_firmware_code=parseInt(response[i].firmwarecode);
                    var new_app_name=response[i].app_name;
                    var new_md5=response[i].md5;
                    var softTips="";
                    var firmTips="";
                    if(isCnLang()){
                        softTips=response[i].c_softinfo;
                        firmTips=response[i].c_firminfo;
                    }else{
                        softTips=response[i].e_softinfo;
                        firmTips=response[i].e_firminfo;
                    }
                    //console.log("---------new_firmware_code--------->"+local_root.new_firmware_code);
                    //console.log("-------new_soft_code----------->"+local_root.new_soft_code);
                    //console.log("-----cur_soft_code------------->"+local_root.cur_soft_code);
                    //console.log("-----cur_firmware_code------------->"+local_root.cur_firmware_code);

                    var verLocalFirm=Ams.readFirmwareVersion();
                    if (Ams.isDebug) console.log("------------------"+Ams.getSoftVer()+","+new_soft_ver+","+verLocalFirm+","+new_firmware_ver+",==>"+Ams.versionCmp(new_firmware_ver, getLoaclFirmVersion()))
                    if (Ams.isDebug)  console.log("getLoaclFirmVersion()==>"+getLoaclFirmVersion());
                    if(Ams.versionCmp(verLocalFirm, getLoaclFirmVersion()) <= 0) {//设备版本小于等于pc本地固件版本
                        if ((Ams.getDeviceType()==Ams.A5 || Ams.getDeviceType()==Ams.GD28 || Ams.getDeviceType()==Ams.GD46)&&Ams.getFirmwareCode()<10272) {
                            sf.changeNew(sf.latest,sf.latest,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            toast.show(qsTr("当前为最新版本"));
                            return;
                        }

                        if(Ams.versionCmp(Ams.getSoftVer(), new_soft_ver) < 0){//软件版本比较
                            if(Ams.versionCmp(getLoaclFirmVersion(), new_firmware_ver) < 0){//云端更新（设备小于pc小于云端版本）
                                sf.changeNew(sf.soft,sf.firm_cloud,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            }else  if(Ams.versionCmp(getLoaclFirmVersion(), new_firmware_ver) >= 0){//pc版本等于云端版本
                                if(Ams.versionCmp(verLocalFirm, getLoaclFirmVersion()) < 0){//本地更新（设备<pc==云端）
                                    sf.changeNew(sf.soft,sf.firm_pc,new_soft_ver,softTips,new_firmware_ver,firmTips);
                                }else{
                                    sf.changeNew(sf.soft,sf.latest,new_soft_ver,softTips,new_firmware_ver,firmTips);
                                }
                            }else{
                                sf.changeNew(sf.soft,sf.latest,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            }
                        }else{
                            if(Ams.versionCmp(getLoaclFirmVersion(), new_firmware_ver) < 0){//云端更新
                                sf.changeNew(sf.latest,sf.firm_cloud,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            }else  if(Ams.versionCmp(getLoaclFirmVersion(), new_firmware_ver) >= 0){
                                if(Ams.versionCmp(verLocalFirm, getLoaclFirmVersion()) < 0){//本地更新
                                    sf.changeNew(sf.latest,sf.firm_pc,new_soft_ver,softTips,new_firmware_ver,firmTips);
                                }else{
                                    sf.changeNew(sf.latest,sf.latest,new_soft_ver,softTips,new_firmware_ver,firmTips);
                                    toast.show(qsTr("当前为最新版本"));
                                }
                            }else{
                                sf.changeNew(sf.latest,sf.latest,new_soft_ver,softTips,new_firmware_ver,firmTips);
                                toast.show(qsTr("当前为最新版本"));
                            }
                        }
                    }else{//设备版本大于pc本地固件版本
                        if(Ams.versionCmp(Ams.getSoftVer(), new_soft_ver) < 0){
                            if(Ams.versionCmp(verLocalFirm, new_firmware_ver) < 0){//云端更新
                                sf.changeNew(sf.soft,sf.firm_cloud,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            }else{
                                sf.changeNew(sf.soft,sf.latest,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            }
                        }else{
                            if(Ams.versionCmp(verLocalFirm, new_firmware_ver) < 0){//云端更新
                                sf.changeNew(sf.latest,sf.firm_cloud,new_soft_ver,softTips,new_firmware_ver,firmTips);
                            }else{
                                toast.show(qsTr("当前为最新版本"));
                            }
                        }
                    }
                }
            }
            else
            {
                //alert("Problem retrieving XML data");
                //onsole.log("--------openProblem----------")
                //openDia();
            }
        }
        else {
            //console.log("http error:"+xmlhttp.status);
            //console.log(xmlhttp.readyState+"=readyState，--------openError----------status=")
        }
    }

    DspMessageDialog
    {
        property var   softV: ""
        id:md_online_upd
        standardButtons: StandardButton.Yes | StandardButton.No
//        modality: Qt.ApplicationModal
        icon: StandardIcon.Warning
        title:""
        text:""
        onYes:
        {
//            openDia();
            //Qt.openUrlExternally("http://china-gehang.com.cn/if/DSP/DSP_V"+softV+".zip");
            //Qt.openUrlExternally("http://china-gehang.com.cn/if/DSP/DSP.zip");
        }
        onNo: {
//           openDia();
        }
        onRejected: {
//             openDia();
        }
        function showDias(soft,titls,ctx){
            softV=soft;
            title=titls;
            text=ctx;
            md_online_upd.visible=true;
        }
    }

    DspMessageDialog
    {
        property var typs: 0;
        property var txt: "";
        property var content: "";
        property int chkCmdIdx: -1
        property int typeCmdIdxOfAdaptable: -1;
        signal closeYes(var types);
        id:md_close
        standardButtons: typs == 2 ? StandardButton.Yes : (StandardButton.Yes | StandardButton.No)
//        modality: Qt.ApplicationModal
        icon: StandardIcon.Warning
        title:txt
        text:content
        onYes:
        {
            switch(typs){
            case 1://右上角打岔
                close.accepted=true;
                qTracert.stopProcess();
                Qt.quit();
                break;
            case 2://拔掉设备
                break;
            case 3:
                if (Ams.isNeedResetConfigAfterUpgrade()) {
                    upd_reset_warning_frm.open();
                } else {
                    hidIO.isEnd=false;
                    hidIO.isChange=false;
                    if (Ams.getDeviceType() == Ams.A10 && Ams.versionCmp(Ams.readDeviceVersion(), "1.0.1") < 0) {
                        chkCmdIdx = Ams.devCheckUpgradeValid(md_close);
                    } else {
                        zr_download.downloadFirmwareOrStartUpgrade();
                    }
                }
                break
            case 4:
                showCloseDias(qsTr("固件")+qsTr("更新"),qsTr("发现")+qsTr("新固件版本：")/*+"V"*/+sf.firmV+"("+getLoaclFirmBuildCode()+")\n\n"+qsTr("更新信息：")+"\n"+sf.firmTips+"\n\n"+qsTr("确认升级吗？"),3);
                break;
            case 5:
                showCloseDias("A2B" + (settings.lang == "cn" ? "" : " ") + qsTr("固件")+qsTr("更新"),qsTr("发现")+qsTr("新固件版本：")+hidIO.readInternalA2BIAPFirmwareVersion(false)+"\n\n"+qsTr("更新信息：")+"\n"+root.getFirmTips_A2B()+"\n\n"+qsTr("确认升级吗？"),6);
                break;
            case 6:
                //fileDialog_upgrade_A2B_board.callback = null;
                if (fileDialog_upgrade_A2B_board.byInternal) {
                    //fileDialog_upgrade_A2B_board.startUpgradeA2B(true);
                    zr_download.downloadA2BFirmwareOrStartUpgrade();
                } else {
                    fileDialog_upgrade_A2B_board.visible = true; //显示A2BIAP升级弹窗
                }
                break;
            case 7:
                car_model_settings_win.open();
                break;
            }
        }

        onNo: {
            switch(typs){
            case 1://右上角打岔
                break;
            case 2://拔掉设备
                break;
            case 3:
                if (!Ams.isNeedResetConfigAfterUpgrade()) {
                    hidIO.isEnd=true;
                }
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                if (fileDialog_upgrade_A2B_board.callback == msgBox_A2BIAPStatus) {
                    msgBox_A2BIAPStatus.open();
                }
                break;
            case 7:
                break;
            }
            resertDialog();
        }
        onRejected: {
            no();
        }
        function showDialog(titles, texts,typss) {
            resertDialog();
            md_close.txt = titles;
            md_close.content = texts;
            md_close.typs = typss;
            md_close.visible = true;
        }
        function resertDialog() {
            md_close.txt = "";
            md_close.content = "";
            md_close.typs = 0;
            md_close.visible = false;
        }

        function handleData(cmdIdx, strRet) {
            if (cmdIdx === chkCmdIdx) {
                chkCmdIdx = -1;
                if (strRet.indexOf("upgrade_valid?") == 0) {
                    var state = parseInt(strRet.substring(14));
                    if (state == 1) {
                        typeCmdIdxOfAdaptable = Ams.devType(md_close, hidIO.devTIDList[hidIO.devTIDList.length > 1 ? 1 : 0]);
                        //zr_download.downloadFirmwareOrStartUpgrade();
                    } else {
                        hidIO.isEnd=true;
                        busyView.show(qsTr("固件升级失败")+qsTr("，请重启设备再试。"))
                    }
                } else {
                    zr_download.downloadFirmwareOrStartUpgrade();
                }
            } else if (cmdIdx === typeCmdIdxOfAdaptable) {
                typeCmdIdxOfAdaptable = -1;
                var res=strRet.split(',');
                Ams.saveDeviceInfo(res[0],res[1],res[2],res[3],res[4],res[5]);
                setFirmWarePath();
                zr_download.downloadFirmwareOrStartUpgrade();
            }
        }
    }

    function showCloseDias(titles, texts,typss){
        md_close.showDialog(titles, texts,typss);
    }

    function hideCloseDias(){
        md_close.resertDialog();
    }

    //获取pc固件版本
    function getLoaclFirmVersion(){
        var firmWare = hidIO.readFinallyFirmwareDevInfo();
        if (firmWare.length < 1) {
            firmWare=hidIO.getFirmwareDevInfo();
        }
        console.log("getLoaclFirmVersion: firmWare=="+firmWare);
        var verLocal="";
        if(firmWare==""){
            verLocal= Ams.readFirmwareVersion();
        }else{
            var splitFrimWare=firmWare.split(',');
            verLocal=splitFrimWare[4];
        }
        return verLocal;
    }

    //获取pc固件构建版本号
    function getLoaclFirmBuildCode(){
        var firmWare = hidIO.readFinallyFirmwareDevInfo();
        if (firmWare.length < 1) {
            firmWare=hidIO.getFirmwareDevInfo();
        }
        console.log("getLoaclFirmBuildCode: firmWare=="+firmWare);
        var codeLocal="";
        if(firmWare==""){
            codeLocal= Ams.readFirmwareCurCode();
        }else{
            var splitFrimWare=firmWare.split(',');
            codeLocal=splitFrimWare[5];
        }
        return codeLocal;
    }

    /* 校验连接密码 */
    Popup {
        id:passwd_check_frame;
        x: (root.width-width)/ 2
        y: (root.height-height)/2
//                closePolicy:Popup.NoAutoClose
        // width: Math.min(root.width, root.heigh) / 3 * 2
        implicitWidth: (settings.lang == "pt" || settings.lang == "es") ? 420 : 344
        implicitHeight: 145
        //leftMargin: 21
        modal: true
        closePolicy:Popup.NoAutoClose
        background:Rectangle {
            width: parent.width-10
            height: parent.height-10
            radius: 25
            border.width: 2
            border.color:"#47647f"
            gradient: Gradient {
                GradientStop { position: 0.0; color: "#010406" }
                GradientStop { position: 1.0; color: "#1e3142" }
            }

            /* 用于阻止光标变成底层窗口的输入框光标、拖动光标等 */
            MouseArea {
                anchors.fill: parent
                enabled: passwd_check_frame.visible
            }
        }
        onOpened: {
            io.isToolTipVisibleEnabled = false;
            input_pwd.text = "";
            input_pwd.forceActiveFocus();
        }
        onClosed: {
            io.isToolTipVisibleEnabled = true;
        }
        function modalShow() {
            hidIO.syncCallback = null;
            busyView.closeAllDialog();
            busyView.hide();
            open();
        }
        //focus: true
        property var call_back_target;
        contentItem: ColumnLayout {
            //spacing: 25
            //anchors.fill: parent
            Rectangle {
                id:pwd_txt
                height: 36
//                        width:200
//                        spacing: 10
                anchors.left: parent.left
                anchors.leftMargin: 40
                anchors.top: parent.top
                anchors.topMargin: 30
                Label {
                    id: pwd_frame_item_label
                    anchors.top: parent.top
                    anchors.left: parent.left
                    text: qsTr("请输入连接密码：");
                    font.bold: settings.fontBold
                    font.pixelSize: 14
                    color: "#90bcea"
                }
                TextField {
                    id: input_pwd
                    width: (settings.lang == "pt" || settings.lang == "es") ? 200 : 120
                    height: 36
                    anchors.verticalCenter: pwd_frame_item_label.verticalCenter
                    anchors.left: pwd_frame_item_label.right
                    anchors.leftMargin: 3
                    maximumLength: 8
                    color: text.length > 0?"#90bcea":"#495458"
                    placeholderText:'<font size="12px">'+(settings.fontBold?'<strong>':'')+ qsTr("请输入8位密码")+(settings.fontBold?'</strong>':'')+'</font>'
                    echoMode:TextInput.Password
                    verticalAlignment: Text.AlignVCenter
                    validator: RegExpValidator{regExp:/[A-Za-z0-9_]+/}
                    selectByMouse: true
                    background: Rectangle{
                        width: parent.width
                        height: parent.height
                        gradient: Gradient {
                            GradientStop { position: 0 ; color: "#0e151e" }
                            GradientStop { position: 1 ; color:"#314a68" }
                        }
//                                color: "yellow"
                        border.width: 1
                        border.color: "#4b5359"
                    }
                    onTextChanged: {
                        pwd_frame_item_tip.hide();
                    }
                }
                Label {
                    id: pwd_frame_item_tip
                    anchors.top: input_pwd.bottom
                    anchors.topMargin: 5
                    anchors.left: input_pwd.left
                    visible: false
                    text: "" //qsTr("密码错误，请重新输入！");
                    font.bold: settings.fontBold
                    font.pixelSize: 12
                    color: "red"

                    function show(tip) {
                        text = tip;
                        visible = true;
                    }
                    function hide() {
                        text = "";
                        visible = false;
                    }
                }
            }

            AmsButton4 {
                id: pwd_frame_okButton
                anchors.top:pwd_txt.bottom
                anchors.topMargin: 15
                anchors.left: parent.left
                anchors.leftMargin: isCnLang()?45:38
                width: 100
                txt:qsTr("确认")
                onClicked: {
                    if(input_pwd.text.length!=8)
                    {
                        pwd_frame_item_tip.show(qsTr("密码少于8位！"));
                        input_pwd.forceActiveFocus();
                        return;
                    }
                    Ams.devCheckPwd(pwd_frame_okButton, input_pwd.text);
                }
                function handleData(cmdIdx, strRet) {
                    input_pwd.text = "";
                    input_pwd.forceActiveFocus();
                    switch (strRet) {
                    case "ok":
                    case "empty":
                        Ams.setPwdCheckedState(strRet==="empty"?2:1);
                    case "cmd not found": //兼容旧版本固件
                        busyView.modalShow(qsTr("设备识别中，请稍候..."));
                        hidIO.devTIDSettableCmdIdx = Ams.devGetDevTIDSettable(hidIO);
                        break;
                    case "error":
                        Ams.setPwdCheckedState(-1);
                        if (passwd_check_frame.visible) {
                            pwd_frame_item_tip.show(qsTr("密码异常，请联系厂家！"));
                        } else {
                            passwd_check_frame.modalShow();
                        }
                        break;
                    case "fail":
                        Ams.setPwdCheckedState(0);
                        if (passwd_check_frame.visible) {
                            pwd_frame_item_tip.show(qsTr("密码错误，请重新输入！"));
                        } else {
                            passwd_check_frame.modalShow();
                        }
                        break;
                    default:
                        Ams.setPwdCheckedState(0);
                        if (passwd_check_frame.visible) {
                            cur_pwd_tip.show(qsTr("操作失败，请稍候再试！"));
                        } else {
                            passwd_check_frame.modalShow();
                        }
                        break;
                    }
                    console.log("handleData: cmdIdx = " + cmdIdx + ", strRet:" + strRet);
                }
            }
            AmsButton4 {
                anchors.top: pwd_frame_okButton.top
                anchors.left: pwd_frame_okButton.right
                anchors.leftMargin: 30
                width: (settings.lang == "pt" || settings.lang == "es") ? 180 : 100
                txt: qsTr("还原出厂配置")
                onClicked: {
                    input_pwd.text = "";
                    pwd_frame_item_tip.hide();
                    passwd_check_frame.close();
                    reset_warning_frm.openWithPolicy(Popup.NoAutoClose);
                }
            }
            Keys.onTabPressed: {
                console.log("passwd_check_frame Keys.onTabPressed");
            }
            Keys.onSpacePressed: {
                console.log("passwd_check_frame Keys.onSpacePressed");
            }
            Keys.onEnterPressed: {
                pwd_frame_okButton.clicked();
            }
            Keys.onReturnPressed: {
                pwd_frame_okButton.clicked();
            }
        }
    }

    /* 设置车型 */
    WinCarModelSettings {
        id: car_model_settings_win
    }

    Toast {
        id:toast
        text: ""
        z:10//显示在其他控件之上，保证能看见，无需设置其高度和宽度
        interval:2000//显示时间
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter
    }

    /* 最后一个编写的可见控件将处于最上层，用作拖放控件时的父控件可以使被拖放控件处于最上层 */
    Item {
        id: drag_top
        width: 0
        height: 0
        function setRectangle(needWidth, needHeight) {
            width = needWidth;
            height = needHeight;
        }
    }

    Timer {
        id: timer_twinkle
        interval: 500
        repeat: true
        triggeredOnStart: true
        property bool isBright: false

        onRunningChanged: {
            if (!running) {
                isBright = false;
            }
        }

        onTriggered: {
            isBright = !isBright;
        }
    }

    property var mItemsHeightSum: 0
    Timer {
        id: detectMarginTimer
        interval: 1
        running: false
        repeat: false
        onTriggered: {
            if(doCalcMargin()){
                stop;
            }
        }
    }
    //返回值： 是否需要停止定时器
    function doCalcMargin(){
        var myParent = sub_area;
//		console.log("main1 detectMarginTimer width=" + myParent.width + ",height=" + myParent.height)
        if(myParent.height > 0){
//			console.log("main1 detectMarginTimer width=" + myParent.width + ",height=" + myParent.height)
//			console.log("main1 root width=" + root.width + ",height=" + root.height)

            var valid = true
            var items = sub_area.children;
            var visibleItems = []
            var heightSum = 0.0;
            var i;
            var validItemCount = 0;

            visibleItems.push(row_check);
            heightSum += row_check.height;
//			console.log("row_check.height=" + row_check.height)
            validItemCount++;

            heightSum += io.getItemsHeightTotal();
            validItemCount += io.getItemsCountTotal();
            if(mItemsHeightSum == 0){
                mItemsHeightSum = heightSum
            }else{
                heightSum = mItemsHeightSum;
            }



            if(! valid){
                console.log("main detectMarginTimer not valid")
                return false;
            }
            if(row_check.height > 0){
//				stop();
            }
            if(validItemCount < 1){
                return true;
            }

            //var totalHeight = parent.width - visibleItems[0].anchors.leftMargin - visibleItems[visibleItems - 1].anchors.rightMargin;
            var totalHeight = myParent.height;
            console.log("totalHeight=" + totalHeight);
            console.log("heightSum=" + heightSum);
            var space = totalHeight - heightSum;
//			console.log("space=" + space);
            if(validItemCount <= 1){
                return true;
            }

//			space /= (validItemCount + 1)
            space /= (validItemCount)
//			console.log("space=" + space);
            if(space < 15)
                space = 15;
//			console.log("space=" + space);

            for(i = 0;i < visibleItems.length;i++){
                visibleItems[i].anchors.topMargin = space


//				console.log("topMargin[" + i + "]=" + visibleItems[i].anchors.topMargin);
            }
            io.setItemsSpace(space)

//			grahp_frame.anchors.topMargin = space
            ioInputEQ.setItemsSpace(space)
            return true;
        }
        return false;
    }

    function redoLayout(){
        detectMarginTimer.restart();
        //doCalcMargin();
        io.recalcMargin();
        //io.doCalcMargin();
    }
    function invalidCaches(){
        mItemsHeightSum = 0;
    }

    onWidthChanged: {
        console.log("onWidthChanged=" + width);
        //redoLayout()
    }
    onHeightChanged: {
        console.log("onHeightChanged=" + height);
        //redoLayout()
    }
}
