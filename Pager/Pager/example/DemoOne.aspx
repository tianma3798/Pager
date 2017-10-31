<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DemoOne.aspx.cs" Inherits="JSSolution.Pager.example.DemoOne" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="../Css/pageBar.css" rel="stylesheet" />
    <script src="../js/jquery-1.8.2.min.js"></script>
    <script src="../js/pageBar1.0.js"></script>
    <script type="text/javascript">

        //分页事件
        function loadList() {
            var pageindex = bar.getCurrentNumber();

            //alert(pageindex);
            var loc = window.location;

            var url = "http://" + loc.host + loc.pathname + '?pageindex=' + pageindex;
            loc.href = url;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="pageBar">
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
        </div>

        <script type="text/javascript">
            var bar = $('.pageBar').pageBar({
                pageIndex: '<%=pageIndex%>',
                submitEvent: loadList,
                recordCount: '<%=recordCount%>',
                pageSize: '<%=pageSize%>'
            });
        </script>
    </form>
</body>
</html>
