<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Page3One.aspx.cs" Inherits="Pager.Pager3._0Demo.PageOne" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="../Pager/js/jquery-1.8.2.min.js"></script>
    <link href="../Pager3.0/pageBar3.0.css" rel="stylesheet" />
    <script src="../Pager3.0/pageBar3.0.js"></script>
    <script type="text/javascript">
        //分页事件
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
        <br />
        <%--样式3--%>
        <div id="pageThree" class="pageBar"></div>
        <%--样式2--%>
        <br />
        <br />
        <div class="pageBar" id="pagerTwo"></div>
        <br />
        <br />
        <br />
        <%--样式1--%>
        <div class="pageBar" id="pagerOne"></div>
        <br />
        <br />
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

        <script type="text/javascript">
             <%--样式1--%>
<%--            var barOne = $('#pagerOne').pageBar({
                pageIndex: '<%=pageIndex%>',
                submitEvent: function (number) {
                    goToPageIndex(number);
                },
                recordCount: '<%=recordCount%>',
                pageSize: '<%=pageSize%>'
            });--%>

              <%--样式2--%>
<%--            var barTwo = $('#pagerTwo').pageBar({
                pageIndex: '<%=pageIndex%>',
                submitEvent: function (number) {
                    goToPageIndex(number);
                },
                recordCount: '<%=recordCount%>',
                pageSize: '<%=pageSize%>',
                showType: 'greenPager'
            });--%>

             <%--样式3--%>
        var barTwo = $('#pageThree').pageBar({
                pageIndex: '<%=pageIndex%>',
                submitEvent: function (number) {
                    goToPageIndex(number);
                },
                recordCount: '<%=recordCount%>',
                pageSize: '<%=pageSize%>',
                showType: 'bluePager'
            });
        </script>
    </form>
</body>
</html>
