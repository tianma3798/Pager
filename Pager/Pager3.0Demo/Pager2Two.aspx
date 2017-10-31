<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Pager2Two.aspx.cs" Inherits="Pager.Pager2._0Demo.Pager2Two" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="../Pager/js/jquery-1.8.2.min.js"></script>
    <link href="../Pager3.0/pageBar3.0.css" rel="stylesheet" />
    <script src="../Pager3.0/pageBar3.0.js"></script>
    <script type="text/javascript">
        //分页事件
        //function loadList() {
        //    var pageindex = barOne.getCurrentNumber();

        //    //alert(pageindex);
        //    var loc = window.location;

        //    var url = "http://" + loc.host + loc.pathname + '?pageindex=' + pageindex;
        //    loc.href = url;
        //}

        function goToPageIndex(pageindex) {
            var loc = window.location;
            var url = "http://" + loc.host + loc.pathname + '?pageindex=' + pageindex;
            loc.href = url;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">

        
       <br />
        <br /><br />
       <%--样式1--%>
        <div class="pageBar" id="pagerOne">
        </div>
        <table>
                <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                        <tr>
                            <td><%#Eval("ID") %></td>
                            <td><%#Eval("Name") %></td>
                        </tr>
                    </ItemTemplate>
                </asp:Repeater>
       </table>
        <%--样式2--%>
        <hr />
        <table>
                <asp:Repeater ID="Repeater2" runat="server">
                    <ItemTemplate>
                        <tr>
                            <td><%#Eval("ID") %></td>
                            <td><%#Eval("Name") %></td>
                        </tr>
                    </ItemTemplate>
                </asp:Repeater>
            </table>
        <div class="pageBar" id="pagerTwo">
        </div>

       <br /><br /><br />
        <div id="pageThree" class="pageBar"></div>

        <script type="text/javascript">
            var barOne = $('#pagerOne').pageBar({
                pageIndex: '<%=pageIndex%>',
                submitEvent: function () {
                    var pageindex = barOne.getPageIndex();
                    goToPageIndex(pageindex);
                },
                recordCount: '<%=recordCount%>',
                pageSize: '<%=pageSize%>',
                showGoBtn: false
            });
            var barTwo = $('#pagerTwo').pageBar({
                pageIndex: '<%=pageIndex%>',
                submitEvent: function () {
                    var pageindex = barTwo.getPageIndex();
                    goToPageIndex(pageindex);
                },
                recordCount: '<%=recordCount%>',
                pageSize: '<%=pageSize%>',
                showType: 'greenPager',
                showGoBtn:false
            });

        </script>
    </form>
</body>
</html>
