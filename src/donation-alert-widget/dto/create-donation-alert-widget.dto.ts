export class CreateDonationAlertWidgetDto {
  text: string;
  minAmount?: number;
  maxAmount?: number;
  specificAmount?: number;
  userId: number;
  alertWidgetsGroupId: number;
}