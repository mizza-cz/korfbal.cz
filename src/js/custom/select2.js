$(".js-select").select2({
  width: "100%",
  minimumResultsForSearch: -1,
});

$(function () {
  $(".js-selectSubmit").on("change", function () {
    $(this).closest("form").submit();
  });
});
